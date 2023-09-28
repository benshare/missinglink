import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { WeeklyChallenge } from "../../types/puzzle"

export type WeeklyChallengesState = WeeklyChallenge[]
type ActionPayload = {
	batchAdd: WeeklyChallenge[]
}

export const weeklyChallengesSlice = createSlice({
	name: "weeklyChallenges",
	initialState: {} as WeeklyChallengesState,
	reducers: {
		batchAdd: (
			_,
			{ payload: packs }: PayloadAction<ActionPayload["batchAdd"]>
		) => {
			return packs
		},
	},
})

export const { batchAdd } = weeklyChallengesSlice.actions
