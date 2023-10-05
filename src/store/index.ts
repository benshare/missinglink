import {
	AnyAction,
	combineReducers,
	configureStore,
	createSelector,
} from "@reduxjs/toolkit"
import { CurrentUserState, currentUserSlice } from "./currentUser"
import { LeaderboardState, leaderboardSlice } from "./leaderboard"
import { PackStatus, WeekStatus } from "../types/puzzle"
import { PacksState, packsSlice } from "./packs"
import { PuzzlesState, puzzlesSlice } from "./puzzles"
import {
	WeeklyChallengesState,
	weeklyChallengesSlice,
} from "./weeklyChallenges"
import { addDays, dateDiffInDays } from "../utils"

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
	streak: ({ currentUser: { profile } }: RootState) => profile?.streak,
}

export const selectWeeks = ({ weeklyChallenges }: RootState) => weeklyChallenges
export const selectWeek =
	(id: number) =>
	({ weeklyChallenges }: RootState) =>
		weeklyChallenges.find(({ id: weekId }) => id === weekId)!
export const selectCurrentWeek = ({ weeklyChallenges }: RootState) => {
	return weeklyChallenges.length > 0
		? weeklyChallenges.find(({ startDate: { year, month, day } }) => {
				const startDay = new Date(Date.UTC(year, month - 1, day))
				const endDay = addDays(startDay, 7)
				return startDay <= today && endDay > today
		  })!.id
		: null
}

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

export const selectStreaks = createSelector(
	[selectWeeks, selectPacks],
	(weeks, packs) => {
		if (weeks.length === 0 || Object.keys(packs).length === 0) {
			return null
		}
		let foundStartDay: Date = null as any
		let currentWeekIndex: number = null as any
		for (const index in weeks) {
			const {
				startDate: { year, month, day },
			} = weeks[index]
			const startDay = new Date(Date.UTC(year, month - 1, day))
			const endDay = addDays(startDay, 7)
			if (startDay <= today && endDay > today) {
				foundStartDay = startDay
				currentWeekIndex = parseInt(index)
				break
			}
		}
		const initialOffset = dateDiffInDays(today, foundStartDay)
		let offset = initialOffset

		let week = weeks[currentWeekIndex]
		let streak = 0
		for (let weekIndex = currentWeekIndex; weekIndex >= 0; weekIndex--) {
			week = weeks[weekIndex]
			const { status, packs: packsForWeek } = week
			if (
				weekIndex !== currentWeekIndex &&
				status !== WeekStatus.complete
			) {
				break
			}
			let allComplete = true
			while (offset >= 0) {
				const { status } = packs[packsForWeek[offset].pack]
				if (status === PackStatus.complete) {
					streak++
				} else {
					if (
						!(
							weekIndex === currentWeekIndex &&
							offset === initialOffset
						)
					) {
						allComplete = false
						break
					}
				}
				offset--
			}
			if (!allComplete) {
				break
			}
			offset = week.packs.length - 1
		}
		return streak
	}
)

export const selectLeaderboard = ({ leaderboard }: RootState) => leaderboard
