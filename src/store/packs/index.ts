import { PackStatus, PuzzlePack } from "../../types/puzzle"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type PacksState = { [key in number]: PuzzlePack }

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
			return {
				...store,
				[pack_id]: {
					...store[pack_id],
					status,
					puzzles: store[pack_id].puzzles.map(({ id }, index) => ({
						id,
						complete: puzzles_completed[index],
					})),
				},
			}
		},
	},
})

export const { batchAdd, singleUpdate } = packsSlice.actions
