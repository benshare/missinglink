import { PackStatus, WeekStatus } from "../types/puzzle"
import { selectCurrentPack, selectCurrentUser } from "../store"

import { supabase } from "./supabase"
import { useSelector } from "react-redux"

namespace Updates {
	export function usePuzzleComplete() {
		const currentStreak = useSelector(selectCurrentUser.currentStreak)
		const maxStreak = useSelector(selectCurrentUser.maxStreak)
		const currentPackId = useSelector(selectCurrentPack)
		const hints = useSelector(selectCurrentUser.hints)

		return async (
			packId: number,
			puzzleIndex: number,
			previousComplete: boolean[],
			isLastPack: boolean,
			weekId: number,
			weekStatus: WeekStatus
		) => {
			console.log({ weekId, packId, puzzleIndex })
			const {
				data: { user },
			} = await supabase.auth.getUser()

			// const newComplete = [true, false, false, false, false]
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
			console.log({ newComplete, newStatus })

			await supabase.from("pack_progress").upsert({
				pack_id: packId,
				puzzles_completed: newComplete,
				status: newStatus,
			})

			if (newStatus === PackStatus.complete) {
				console.log("in complete")
				await supabase
					.from("profiles")
					.update({ hints: hints! + 1 })
					.eq("id", user!.id)
				if (isLastPack) {
					await supabase.from("weeks_completed").upsert({
						week_id: weekId,
						on_time: weekStatus === WeekStatus.inProgress,
					})
				}

				if (packId === currentPackId) {
					const newStreak = currentStreak! + 1
					await supabase
						.from("profiles")
						.update({
							current_streak: newStreak,
							max_streak:
								newStreak > maxStreak! ? newStreak : undefined,
							streak_includes_today: true,
						})
						.eq("id", user!.id)
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

	export function useHintUsed(puzzleId: number) {
		const hints = useSelector(selectCurrentUser.hints)

		return async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser()
			await Promise.all([
				supabase.from("hints").insert([{ puzzle_id: puzzleId }]),
				supabase
					.from("profiles")
					.update({ hints: hints! - 1 })
					.eq("id", user!.id),
			])
		}
	}
}

export default Updates
