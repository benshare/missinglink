export enum PuzzleType {
	standard = "standard",
}
export type PuzzleData = {
	[PuzzleType.standard]: {
		before: string
		after: string
		solution: string
	}
}
export type Puzzle = {
	id: number
	title: string
	type: PuzzleType
	data: PuzzleData
}

export enum PackStatus {
	locked = "locked",
	inProgress = "inProgress",
	complete = "complete",
}
export type PuzzlePack = {
	id: number
	title: string
	puzzles: number[]
	progress: {
		status: PackStatus
		nextPuzzle: number
	}
}
