import { PackStatus, WeekStatus } from "../types/puzzle"

import { selectCurrentUser } from "../store"
import { supabase } from "./supabase"
import { useSelector } from "react-redux"

namespace Updates {
	export function usePuzzleComplete() {
		const currentStreak = useSelector(selectCurrentUser.currentStreak)
		const maxStreak = useSelector(selectCurrentUser.maxStreak)

		return async (
			packId: number,
			puzzleIndex: number,
			previousComplete: boolean[],
			isLastPack: boolean,
			weekId: number,
			weekStatus: WeekStatus
		) => {
			const {
				data: { user },
			} = await supabase.auth.getUser()

			const newComplete = previousComplete
				.slice(0, puzzleIndex)
				.concat(true)
				.concat(previousComplete.slice(puzzleIndex + 1))
			const newStatus = newComplete.reduce(
				(before, after) => before && after,
				true
			)
				? PackStatus.complete
				: PackStatus.inProgress

			await supabase.from("pack_progress").upsert({
				pack_id: packId,
				puzzles_completed: newComplete,
				status: newStatus,
			})

			if (newStatus === PackStatus.complete) {
				const newStreak = currentStreak! + 1
				await supabase
					.from("profiles")
					.update(
						newStreak > maxStreak!
							? {
									current_streak: newStreak,
									max_streak: newStreak,
							  }
							: { current_streak: newStreak }
					)
					.eq("id", user!.id)
				if (isLastPack) {
					await supabase.from("weeks_completed").upsert({
						week_id: weekId,
						on_time: weekStatus === WeekStatus.inProgress,
					})
				}
			}
		}
	}

	export async function setUsername(username: string) {
		const {
			data: { user },
		} = await supabase.auth.getUser()
		await supabase.from("profiles").update({ username }).eq("id", user!.id)
	}
}

export default Updates
