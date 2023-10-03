import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"
import { CurrentUserState, currentUserSlice } from "./currentUser"
import { PacksState, packsSlice } from "./packs"
import { PuzzlesState, puzzlesSlice } from "./puzzles"
import {
	WeeklyChallengesState,
	weeklyChallengesSlice,
} from "./weeklyChallenges"
import { addDays, dateFromLocaleString } from "../utils"

import { PackStatus } from "../types/puzzle"

const today = new Date()

const reducers = {
	currentUser: currentUserSlice.reducer,
	puzzles: puzzlesSlice.reducer,
	packs: packsSlice.reducer,
	weeklyChallenges: weeklyChallengesSlice.reducer,
}
const appReducer = combineReducers(reducers)

export type RootState = {
	currentUser: CurrentUserState
	puzzles: PuzzlesState
	packs: PacksState
	weeklyChallenges: WeeklyChallengesState
}
const baseData: RootState = {
	currentUser: {
		signedIn: false,
	},
	puzzles: {},
	packs: [],
	weeklyChallenges: [],
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
}

export const selectWeeks = ({ weeklyChallenges }: RootState) => weeklyChallenges
export const selectWeek =
	(id: number) =>
	({ weeklyChallenges }: RootState) =>
		weeklyChallenges.find(({ id: weekId }) => id === weekId)!
export const selectCurrentWeek = ({ weeklyChallenges }: RootState) => {
	return weeklyChallenges.length > 0
		? weeklyChallenges.find(({ startDate }) => {
				const startDay = dateFromLocaleString(startDate)
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
