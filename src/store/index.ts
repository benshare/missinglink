import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"
import { CurrentUserState, currentUserSlice } from "./currentUser"
import { PacksState, packsSlice } from "./packs"
import { PuzzlesState, puzzlesSlice } from "./puzzles"
import {
	WeeklyChallengesState,
	weeklyChallengesSlice,
} from "./weeklyChallenges"

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
export const selectCurrentWeek = ({ weeklyChallenges }: RootState) =>
	weeklyChallenges.length > 0
		? weeklyChallenges[weeklyChallenges.length - 1].id
		: null

export const selectPack =
	(id: number) =>
	({ packs }: RootState) =>
		packs.find(({ id: packId }) => id === packId)!

// export const selectPuzzle =
// 	(id: number) =>
// 	({ puzzles }: RootState) =>
// 		puzzles[id]
