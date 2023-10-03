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
export type Puzzle<T extends PuzzleType> = {
	id: number
	title: string
	type: PuzzleType
	data: PuzzleData[T]
}

export enum PackStatus {
	locked = "locked",
	notStarted = "notStarted",
	inProgress = "inProgress",
	complete = "complete",
}
export type PuzzlePack = {
	id: number
	title: string
	puzzles: { id: number; complete: boolean }[]
	status: PackStatus
	weekId: number
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

export enum WeekStatus {
	locked,
	inProgress,
	complete,
	pastIncomplete,
	pastComplete,
}
export type WeeklyChallenge = {
	id: number
	title: string
	startDate: string
	packs: { day: DayOfWeek; pack: number }[]
	status: WeekStatus
}
