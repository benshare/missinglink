export enum PuzzleType {
	standard,
}
export type PuzzleData = {
	[PuzzleType.standard]: {
		before: string
		after: string
		solution: string
	}
}

export type Puzzle = {
	id: string
	title: string
	type: PuzzleType
	data: PuzzleData
}

export enum PackStatus {
	locked,
	inProgress,
	complete,
}

export type PuzzlePack = {
	id: string
	title: string
	puzzles: Puzzle[]
	progress: {
		status: PackStatus
		nextPuzzle: number
	}
}
