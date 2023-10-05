import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type LeaderboardState = {
	userId: string
	username: string
	currentStreak: number
	maxStreak: number
}[]
type ActionPayload = {
	batchAdd: {
		user_id: string
		username: string
		current_streak: number
		max_streak: number
	}[]
}

export const leaderboardSlice = createSlice({
	name: "leaderboard",
	initialState: {} as LeaderboardState,
	reducers: {
		batchAdd: (
			_,
			{ payload: leaderboard }: PayloadAction<ActionPayload["batchAdd"]>
		) =>
			leaderboard.map(
				({
					user_id,
					username,
					current_streak: currentStreak,
					max_streak: maxStreak,
				}) => ({
					userId: user_id,
					username,
					currentStreak,
					maxStreak,
				})
			),
	},
})

export const { batchAdd } = leaderboardSlice.actions
