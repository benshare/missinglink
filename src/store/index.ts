import {
	AnyAction,
	combineReducers,
	configureStore,
	createSelector,
} from "@reduxjs/toolkit"
import { CurrentUserState, currentUserSlice } from "./currentUser"
import { LeaderboardState, leaderboardSlice } from "./leaderboard"
import { PacksState, packsSlice } from "./packs"
import { PuzzlesState, puzzlesSlice } from "./puzzles"
import {
	WeeklyChallengesState,
	weeklyChallengesSlice,
} from "./weeklyChallenges"
import { addDays, dateDiffInDays } from "../utils"

import { PackStatus } from "../types/puzzle"

const today = new Date()

const reducers = {
	currentUser: currentUserSlice.reducer,
	puzzles: puzzlesSlice.reducer,
	packs: packsSlice.reducer,
	weeklyChallenges: weeklyChallengesSlice.reducer,
	leaderboard: leaderboardSlice.reducer,
}
const appReducer = combineReducers(reducers)

export type RootState = {
	currentUser: CurrentUserState
	puzzles: PuzzlesState
	packs: PacksState
	weeklyChallenges: WeeklyChallengesState
	leaderboard: LeaderboardState
}
const baseData: RootState = {
	currentUser: {
		signedIn: false,
	},
	puzzles: {},
	packs: [],
	weeklyChallenges: [],
	leaderboard: [],
}
const rootReducer = (state: any, action: AnyAction) => {
	if (action.type === "LOGOUT") {
		return appReducer(baseData, action)
	}
	return appReducer(state, action)
}
export const store = configureStore<RootState>({
	reducer: rootReducer,
})

export function signOut() {
	store.dispatch({ type: "LOGOUT" })
}

export const selectIsSignedIn = ({ currentUser: { signedIn } }: RootState) =>
	signedIn
// This should be called from screens accessible only when signed in
export const selectCurrentUser = {
	accessToken: ({ currentUser: { accessToken } }: RootState) => accessToken,
	phoneNumber: ({ currentUser: { phoneNumber } }: RootState) => phoneNumber,
	username: ({ currentUser: { profile } }: RootState) => profile?.username,
	currentStreak: ({ currentUser: { profile } }: RootState) =>
		profile?.currentStreak,
	maxStreak: ({ currentUser: { profile } }: RootState) => profile?.maxStreak,
	hints: ({ currentUser: { profile } }: RootState) => profile?.hints,
}

export const selectWeeks = ({ weeklyChallenges }: RootState) => weeklyChallenges
export const selectWeek =
	(id: number) =>
	({ weeklyChallenges }: RootState) =>
		weeklyChallenges.find(({ id: weekId }) => id === weekId)!

export const selectCurrentPack = createSelector(
	[({ weeklyChallenges }: RootState) => weeklyChallenges],
	(weeks) => {
		if (weeks.length === 0) {
			return null
		}
		const {
			startDate: { year, month, day },
			packs,
		} = weeks.find(({ startDate: { year, month, day }, packs }) => {
			const startDay = new Date(Date.UTC(year, month - 1, day))
			const endDay = addDays(startDay, 7)
			return startDay <= today && endDay > today
		})!
		const startDay = new Date(Date.UTC(year, month - 1, day))
		const offset = dateDiffInDays(startDay, today)
		return packs[offset].pack
	}
)

export const selectPacks = ({ packs }: RootState) => packs
export const selectPack =
	(id: number) =>
	({ packs }: RootState) =>
		packs[id]
export const selectIsLastPackForWeek =
	(packId: number) =>
	({ weeklyChallenges, packs }: RootState) => {
		const { weekId } = packs[packId]
		const week = weeklyChallenges.find(({ id }) => id === weekId)!
		const allPackIds = week.packs.map(({ pack }) => pack)
		for (const otherPackId of allPackIds) {
			const pack = packs[otherPackId]
			if (otherPackId !== packId && pack.status !== PackStatus.complete) {
				return false
			}
		}
		return true
	}

export const selectPuzzle =
	(id: number) =>
	({ puzzles }: RootState) =>
		puzzles[id]

export const selectLeaderboard = ({ leaderboard }: RootState) => leaderboard
