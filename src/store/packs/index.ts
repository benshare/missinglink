import { PackStatus, PuzzlePack } from "../../types/puzzle"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type PacksState = PuzzlePack[]

export type ActionPayload = {
	batchAdd: PacksState
	singleUpdate: {
		pack_id: number
		status: PackStatus
		puzzles_completed: boolean[]
	}
}

export const packsSlice = createSlice({
	name: "packs",
	initialState: {} as PacksState,
	reducers: {
		batchAdd: (
			_,
			{ payload: packs }: PayloadAction<ActionPayload["batchAdd"]>
		) => packs,
		singleUpdate: (
			store,
			{
				payload: { pack_id, status, puzzles_completed },
			}: PayloadAction<ActionPayload["singleUpdate"]>
		) => {
			return store.map((pack) => {
				if (pack.id !== pack_id) {
					return pack
				}
				return {
					...pack,
					status,
					puzzles: pack.puzzles.map(({ id }, index) => ({
						id,
						complete: puzzles_completed[index],
					})),
				}
			})
		},
	},
})

export const { batchAdd, singleUpdate } = packsSlice.actions
