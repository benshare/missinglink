import { PacksState, batchAdd as batchAddPacks } from "../store/packs"
import { PuzzlesState, batchAdd as batchAddPuzzles } from "../store/puzzles"
import {
	WeeklyChallengesState,
	batchAdd as batchAddWeeks,
} from "../store/weeklyChallenges"

import { PackStatus } from "../types/puzzle"
import { supabase } from "./supabase"
import { useDispatch } from "react-redux"

export function useInitialLoad() {
	const dispatch = useDispatch()

	return async function doInitialLoad() {
		let { data: weeklyChallengeData, error: weeksError } =
			await supabase.rpc("get_weekly_challenges")

		let { data: packsData, error: packsError } = await supabase
			.from("packs")
			.select(
				`
                *,
                puzzles (id),
                progress (status, puzzles_completed)
            `
			)
			.order("id")

		const { data: puzzlesData, error: puzzlesError } = await supabase
			.from("puzzles")
			.select("*")

		if (weeksError || packsError || puzzlesError) {
			console.error(packsError?.message ?? puzzlesError?.message)
			return
		}

		const weeks: WeeklyChallengesState = weeklyChallengeData!.map(
			({ id, title, packs: packIds, statuses }) => {
				const packs = packIds.map((pack, index) => ({
					day: index,
					pack,
				}))

				const packsComplete = statuses.reduce(
					(before, current) =>
						before + current === PackStatus.complete ? 1 : 0,
					0
				)
				switch (packsComplete) {
					case 0:
						var status = PackStatus.locked
						break
					case packs.length:
						status = PackStatus.complete
						break
					default:
						status = PackStatus.inProgress
				}
				return {
					id,
					title,
					packs,
					status,
				}
			}
		)
		dispatch(batchAddWeeks(weeks))

		const packs: PacksState = packsData!.map(
			({ id, title, puzzles, progress: progressRaw }) => {
				const progress: {
					status: PackStatus
					puzzles_completed: boolean[]
				} =
					progressRaw.length > 0
						? {
								status: progressRaw[0].status as PackStatus,
								puzzles_completed:
									progressRaw[0].puzzles_completed,
						  }
						: {
								status: PackStatus.locked,
								puzzles_completed: puzzles.map((_) => false),
						  }
				return {
					id,
					title,
					puzzles: puzzles.map(({ id }, index) => ({
						id,
						complete: progress.puzzles_completed[index],
					})),
					status: progress.status,
				}
			}
		)
		dispatch(batchAddPacks(packs))

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
	}
}
