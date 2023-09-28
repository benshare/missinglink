import { PacksState, batchAdd as batchAddPacks } from "../store/packs"
import { PuzzlesState, batchAdd as batchAddPuzzles } from "../store/puzzles"

import { PackStatus } from "../types/puzzle"
import { supabase } from "./supabase"
import { useDispatch } from "react-redux"

export async function useInitialLoad() {
	const dispatch = useDispatch()

	let { data: packsData, error: packsError } = await supabase
		.from("packs")
		.select(
			`
            *,
            puzzles (id),
            progress (status, next_puzzle)
        `
		)
		.order("id")

	const { data: puzzlesData, error: puzzlesError } = await supabase
		.from("puzzles")
		.select("*")

	if (packsError || puzzlesError) {
		console.error(packsError?.message ?? puzzlesError?.message)
		return
	}

	const puzzles: PuzzlesState = puzzlesData.reduce(
		(beforeStep, { id, title, type, before, after, solution }) => ({
			...beforeStep,
			[id]: {
				id,
				title,
				type,
				data: {
					before,
					after,
					solution,
				},
			},
		}),
		{}
	)
	dispatch(batchAddPuzzles(puzzles))

	const packs: PacksState = packsData!.map(
		({ id, title, puzzles, progress }) => ({
			id,
			title,
			puzzles: puzzles.map(({ id }) => id),
			progress:
				progress.length > 0
					? {
							status: progress[0].status as PackStatus,
							nextPuzzle: progress[0].next_puzzle,
					  }
					: { status: PackStatus.inProgress, nextPuzzle: 0 },
		})
	)
	dispatch(batchAddPacks(packs))
}
