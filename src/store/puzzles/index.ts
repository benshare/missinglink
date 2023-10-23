import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Puzzle, PuzzleType } from "../../types/puzzle"

export type PuzzlesState = {
	[key in number]: Puzzle<PuzzleType> & { hint: boolean }
}
type ActionPayload = {
	batchAdd: PuzzlesState
	gotHint: number
}

export const puzzlesSlice = createSlice({
	name: "puzzles",
	initialState: {} as PuzzlesState,
	reducers: {
		batchAdd: (
			_,
			{ payload: puzzles }: PayloadAction<ActionPayload["batchAdd"]>
		) => puzzles,
		gotHint: (
			store,
			{ payload: puzzleId }: PayloadAction<ActionPayload["gotHint"]>
		) => ({
			...store,
			[puzzleId]: { ...store[puzzleId], hint: true },
		}),
	},
})

export const { batchAdd, gotHint } = puzzlesSlice.actions
