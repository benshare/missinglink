import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { WeekStatus, WeeklyChallenge } from "../../types/puzzle"

export type WeeklyChallengesState = WeeklyChallenge[]
type ActionPayload = {
	batchAdd: WeeklyChallenge[]
	weekComplete: number
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
			{ payload: weekId }: PayloadAction<ActionPayload["weekComplete"]>
		) => {
			const weekIndex = store.findIndex(({ id }) => id === weekId)!
			const { status, ...rest } = store[weekIndex]

			if (status === WeekStatus.inProgress) {
				var newStatus = WeekStatus.complete
			} else if (status === WeekStatus.pastIncomplete) {
				newStatus = WeekStatus.pastComplete
			} else {
				console.error(
					"Received 'week completed' update for an invalid week"
				)
				return store
			}
			return [
				...store.slice(0, weekIndex),
				{
					...rest,
					status: newStatus,
				},
				...store.slice(weekIndex + 1),
			]
		},
	},
})

export const { batchAdd, weekComplete } = weeklyChallengesSlice.actions
