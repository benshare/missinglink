import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { PuzzlePack } from "../../types/puzzle"

export type PacksState = PuzzlePack[]

type ActionPayload = {
	batchAdd: PacksState
}

export const packsSlice = createSlice({
	name: "packs",
	initialState: {} as PacksState,
	reducers: {
		batchAdd: (
			_,
			{ payload: packs }: PayloadAction<ActionPayload["batchAdd"]>
		) => {
			return packs
		},
	},
})

export const { batchAdd } = packsSlice.actions
