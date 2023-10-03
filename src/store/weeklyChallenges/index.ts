import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { WeekStatus, WeeklyChallenge } from "../../types/puzzle"

export type WeeklyChallengesState = WeeklyChallenge[]
export type ActionPayload = {
	batchAdd: WeeklyChallenge[]
	weekComplete: { week_id: number; on_time: boolean }
}

export const weeklyChallengesSlice = createSlice({
	name: "weeklyChallenges",
	initialState: [] as WeeklyChallengesState,
	reducers: {
		batchAdd: (
			_,
			{ payload: weeks }: PayloadAction<ActionPayload["batchAdd"]>
		) => weeks,
		weekComplete: (
			store,
			{
				payload: { week_id, on_time },
			}: PayloadAction<ActionPayload["weekComplete"]>
		) => {
			return {
				...store,
				[week_id]: {
					...store[week_id],
					status: on_time
						? WeekStatus.complete
						: WeekStatus.pastComplete,
				},
			}
		},
	},
})

export const { batchAdd, weekComplete } = weeklyChallengesSlice.actions
