import { PuzzleData } from "../types/puzzle"
import { serviceSupabase } from "../api/supabase"

export async function addWeeks(
	weeks: {
		startDate: Date
		title: string
	}[]
) {
	const { data, error } = await serviceSupabase
		.from("weekly_challenges")
		.insert(
			weeks.map(({ startDate, title }) => ({
				start_date: startDate.toLocaleDateString(),
				title,
			}))
		)
		.select()
	if (error) {
		console.error({ error })
		return []
	}
	return data.map(({ id }) => id)
}

export async function addPacks(weekId: number, titles: string[]) {
	const { data, error } = await serviceSupabase
		.from("packs")
		.insert(titles.map((title) => ({ week: weekId, title })))
		.select()
	if (error) {
		console.error({ error })
		return []
	}
	return data.map(({ id }) => id)
}

export async function addPuzzles(
	packId: number,
	puzzles: PuzzleData["standard"][]
) {
	const { data, error } = await serviceSupabase
		.from("puzzles")
		.insert(
			puzzles.map((puzzle) => ({
				pack_id: packId,
				...puzzle,
			}))
		)
		.select()
	if (error) {
		console.error({ error })
		return []
	}
	return data.map(({ id }) => id)
}
