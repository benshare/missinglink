import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { PuzzlePack } from "core"

export type DailyPuzzlesState = {
	[key in string]: PuzzlePack
}
type ActionPayload = {
	batchAdd: DailyPuzzlesState
}

export const dailyPuzzlesSlice = createSlice({
	name: "dailyPuzzle",
	initialState: {} as DailyPuzzlesState,
	reducers: {
		initialLoad: (
			_,
			{ payload: packs }: PayloadAction<ActionPayload["batchAdd"]>
		) => {
			return packs
		},
	},
})

export const { initialLoad } = dailyPuzzlesSlice.actions
