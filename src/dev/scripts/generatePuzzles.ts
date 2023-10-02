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

console.log("Generating puzzles")
let idx = 0
const puzzles: PuzzleData["standard"][] = []
for (const before in map) {
	if (idx % 10 === 9) {
		console.log(`${idx + 1} / ${Object.keys(map).length}`)
	}
	for (const solution of map[before]) {
		if (!(solution in map)) {
			continue
		}
		for (const after of map[solution]) {
			puzzles.push({ before, after, solution })
		}
	}
	idx++
}
const stringified = JSON.stringify(puzzles)
fs.writeFileSync(filenames.allPuzzles(type), stringified)
fs.writeFileSync(filenames.newPuzzles(type), stringified)
fs.writeFileSync(filenames.usedPuzzles(type), JSON.stringify([]))
