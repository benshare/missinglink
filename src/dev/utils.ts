import { PuzzleData } from "../types/puzzle"
import _ from "lodash"

export const filenames = {
	pairList: (type: string) => `../pairLists/${type}.txt`,
	allPuzzles: (type: string) => `../puzzles/${type}/all.json`,
	newPuzzles: (type: string) => `../puzzles/${type}/new.json`,
	usedPuzzles: (type: string) => `../puzzles/${type}/used.json`,
}

export function puzzlesEqual(
	first: PuzzleData["standard"],
	second: PuzzleData["standard"]
) {
	return (
		first.before === second.before &&
		first.after === second.after &&
		first.solution === second.solution
	)
}
