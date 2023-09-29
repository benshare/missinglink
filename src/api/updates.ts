import { PackStatus } from "../types/puzzle"
import { supabase } from "./supabase"

namespace Updates {
	export async function puzzleComplete(
		packId: number,
		puzzleIndex: number,
		previousComplete: boolean[]
	) {
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
		const { error } = await supabase.from("progress").upsert({
			pack_id: packId,
			puzzles_completed: newComplete,
			status: newStatus,
		})
	}
}

export default Updates
