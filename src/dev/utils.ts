import { PuzzleData } from "../types/puzzle"

export const filenames = {
	pairList: (type: string) => `../pairLists/${type}.txt`,
	allPuzzles: (type: string) => `../puzzles/${type}/all.json`,
	usedPuzzles: (type: string) => `../puzzles/${type}/used.json`,
}

export function puzzlesEqual(
	first: PuzzleData["standard"],
	second: PuzzleData["standard"]
) {
	return first.before === second.before && first.after === second.after
}
