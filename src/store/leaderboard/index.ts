import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type LeaderboardState = {
	userId: string
	username: string
	currentStreak: number
	maxStreak: number
}[]
export type ActionPayload = {
	batchAdd: {
		user_id: string
		username: string
		current_streak: number
		max_streak: number
	}[]
	userUpdated: {
		id: string
		username: string
		current_streak: number
		max_streak: number
	}
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
		userUpdated: (
			store,
			{ payload: update }: PayloadAction<ActionPayload["userUpdated"]>
		) => {
			const previousIndex = store.findIndex(
				({ userId }) => userId === update.id
			)
			if (previousIndex >= 0) {
				var newStore = [
					...store.slice(0, previousIndex),
					...store.slice(previousIndex + 1),
				]
			} else {
				newStore = [...store]
			}

			const newIndex = newStore.findIndex(
				({ currentStreak }) => update.current_streak > currentStreak
			)
			const updatedEntry = {
				userId: update.id,
				username: update.username,
				currentStreak: update.current_streak,
				maxStreak: update.max_streak,
			}
			if (newIndex === -1) {
				if (previousIndex !== undefined) {
					newStore.push(updatedEntry)
				}
				return newStore
			}
			return [
				...newStore.slice(0, newIndex),
				updatedEntry,
				...newStore.slice(newIndex),
			]
		},
	},
})

export const { batchAdd, userUpdated } = leaderboardSlice.actions
