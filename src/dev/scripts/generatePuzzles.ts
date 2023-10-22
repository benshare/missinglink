import * as fs from "fs"

import { PuzzleData } from "../../types/puzzle"
import { filenames } from "../utils"

const type = "general"

function generatePairMap(pairs: [string, string][]) {
	const map: { [key in string]: Set<string> } = {}
	for (const [first, second] of pairs) {
		if (first in map) {
			map[first].add(second)
		} else {
			map[first] = new Set([second])
		}
	}
	return map
}

console.log("Reading pair list")
const text = fs.readFileSync(filenames.pairList(type), "utf-8")
const pairs = text
	.split("\n")
	.map((line) => line.split(" ") as [string, string])

console.log("Generating pair map")
const map = generatePairMap(pairs)

console.log("Generating solution sets")
const solutions: { [key in string]: { [key in string]: Set<string> } } = {}
for (const before in map) {
	for (const solution of map[before]) {
		if (!(solution in map)) {
			continue
		}
		for (const after of map[solution]) {
			if (!(before in solutions)) {
				solutions[before] = { [after]: new Set([solution]) }
				continue
			}
			if (!(after in solutions[before])) {
				solutions[before][after] = new Set([solution])
				continue
			}
			solutions[before][after].add(solution)
		}
	}
}
console.log(solutions)

console.log("Converting to puzzles")
const puzzles: PuzzleData["standard"][] = []
for (const before in solutions) {
	for (const after in solutions[before]) {
		puzzles.push({
			before,
			after,
			solutions: Array.from(solutions[before][after]),
		})
	}
}

const stringified = JSON.stringify(puzzles)
fs.writeFileSync(filenames.allPuzzles(type), stringified)
fs.writeFileSync(filenames.usedPuzzles(type), JSON.stringify([]))
