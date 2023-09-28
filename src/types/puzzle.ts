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

export enum DayOfWeek {
	monday,
	tuesday,
	wednesday,
	thursday,
	friday,
	saturday,
	sunday,
}
export const DayOfWeekText = {
	[DayOfWeek.monday]: "Monday",
	[DayOfWeek.tuesday]: "Tuesday",
	[DayOfWeek.wednesday]: "Wednesday",
	[DayOfWeek.thursday]: "Thursday",
	[DayOfWeek.friday]: "Friday",
	[DayOfWeek.saturday]: "Saturday",
	[DayOfWeek.sunday]: "Sunday",
}

export type WeeklyChallenge = {
	id: number
	title: string
	packs: { day: DayOfWeek; pack: number }[]
	status: PackStatus
}
