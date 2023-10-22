import { DateObj, PackStatus, WeekStatus } from "../types/puzzle"
import { PacksState, batchAdd as batchAddPacks } from "../store/packs"
import { PuzzlesState, batchAdd as batchAddPuzzles } from "../store/puzzles"
import {
	WeeklyChallengesState,
	batchAdd as batchAddWeeks,
} from "../store/weeklyChallenges"
import { addDays, dateDiffInDays } from "../utils"

import { batchAdd as batchAddProfiles } from "../store/leaderboard"
import { profileLoaded } from "../store/currentUser"
import { supabase } from "./supabase"
import { useDispatch } from "react-redux"

export function useInitialLoad() {
	const dispatch = useDispatch()
	const today = new Date()

	return async function doInitialLoad() {
		const {
			data: { user },
		} = await supabase.auth.getUser()

		// Supabase fetches

		let { data: weeklyChallengeData, error: weeksError } =
			await supabase.rpc("get_weekly_challenges")

		const weeksToFetch = Array.from(
			new Set(weeklyChallengeData?.map(({ id }) => id))
		)
		let { data: packsData, error: packsError } = await supabase
			.from("packs")
			.select(
				`
                *,
                puzzles (id),
                pack_progress (status, puzzles_completed)
            `
			)
			.in("week", weeksToFetch)
			.order("id")

		const { data: puzzlesData, error: puzzlesError } = await supabase
			.from("puzzles")
			.select("*")

		// TODO: these two fetches are a bit redundant, although
		// in the future their would be private profile data
		const { data: currentUserData, error: currentUserError } =
			await supabase
				.from("profiles")
				.select(`id, username, current_streak, max_streak, hints`)
				.eq("id", user!.id)

		const { data: profilesData, error: profilesError } = await supabase
			.from("profiles")
			.select(
				`
                id,
                username,
                current_streak,
                max_streak
            `
			)
			.neq("username", null)
			.gt("current_streak", 0)
			.order("current_streak", { ascending: false })
			.order("id", { ascending: true })
			.limit(10)

		if (
			weeksError ||
			packsError ||
			puzzlesError ||
			currentUserError ||
			profilesError
		) {
			console.error(
				packsError?.message ?? puzzlesError?.message ?? profilesError
			)
			return
		}

		// Process and store data in redux

		const packsLocked: { [key in number]: boolean } = {}
		const weeks: WeeklyChallengesState = weeklyChallengeData!.map(
			({
				id,
				title,
				completed_on_time,
				packs: packIds,
				statuses,
				start_date,
			}) => {
				const packs = packIds.map((pack, index) => ({
					day: index,
					pack,
				}))

				const [year, month, day] = start_date.split("-")
				const startDateObj: DateObj = {
					year: parseInt(year),
					month: parseInt(month),
					day: parseInt(day),
				}
				const startDate = new Date(start_date)
				const endDate = addDays(startDate, packs.length)
				if (startDate > today) {
					var status = WeekStatus.locked
				} else {
					const packsComplete = statuses.reduce(
						(before, current) =>
							before + (current === PackStatus.complete ? 1 : 0),
						0
					)
					if (endDate > today) {
						if (packsComplete === packs.length) {
							status = WeekStatus.complete
						} else {
							status = WeekStatus.inProgress
						}
					} else {
						if (packsComplete === packs.length) {
							status = completed_on_time
								? WeekStatus.complete
								: WeekStatus.pastComplete
						} else {
							status = WeekStatus.pastIncomplete
						}
					}
				}
				if (startDate > today) {
					for (const packId of packIds) {
						packsLocked[packId] = true
					}
				} else {
					const offset = dateDiffInDays(today, startDate)
					for (
						let packIndex = 0;
						packIndex < packIds.length;
						packIndex++
					) {
						packsLocked[packIds[packIndex]] = packIndex > offset
					}
				}

				return {
					id,
					title,
					startDate: startDateObj,
					packs,
					status,
				}
			}
		)
		dispatch(batchAddWeeks(weeks))

		const packs: PacksState = {}
		for (const {
			id,
			title,
			puzzles,
			pack_progress: progressRaw,
			week,
		} of packsData!) {
			const progress: {
				status: PackStatus
				puzzles_completed: boolean[]
			} = {
				status: packsLocked[id]
					? PackStatus.locked
					: progressRaw.length > 0
					? (progressRaw[0].status as PackStatus)
					: PackStatus.notStarted,
				puzzles_completed:
					progressRaw.length > 0
						? progressRaw[0].puzzles_completed
						: puzzles.map((_) => false),
			}
			packs[id] = {
				id,
				title,
				puzzles: puzzles.map(({ id }, index) => ({
					id,
					complete: progress.puzzles_completed[index],
				})),
				status: progress.status,
				weekId: week!,
			}
		}
		dispatch(batchAddPacks(packs))

		const puzzles: PuzzlesState = puzzlesData.reduce(
			(beforeStep, { id, title, type, before, after, solutions }) => ({
				...beforeStep,
				[id]: {
					id,
					title,
					type,
					data: {
						before,
						after,
						solutions,
					},
				},
			}),
			{}
		)
		dispatch(batchAddPuzzles(puzzles))

		dispatch(profileLoaded(currentUserData[0]))

		dispatch(
			batchAddProfiles(
				profilesData.map(({ id, username, ...rest }) => ({
					...rest,
					user_id: id,
					username: username!,
				}))
			)
		)
	}
}
