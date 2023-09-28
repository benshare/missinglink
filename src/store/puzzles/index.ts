import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Puzzle } from "../../types/puzzle"

export type PuzzlesState = {
	[key in number]: Puzzle
}
type ActionPayload = {
	batchAdd: PuzzlesState
}

export const puzzlesSlice = createSlice({
	name: "puzzles",
	initialState: {} as PuzzlesState,
	reducers: {
		batchAdd: (
			_,
			{ payload: packs }: PayloadAction<ActionPayload["batchAdd"]>
		) => {
			return packs
		},
	},
})

export const { batchAdd } = puzzlesSlice.actions
