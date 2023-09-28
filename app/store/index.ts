import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"
import { CurrentUserState, currentUserSlice } from "./currentUser"
import { PacksState, packsSlice } from "./packs"
import { PuzzlesState, puzzlesSlice } from "./puzzles"

const reducers = {
	currentUser: currentUserSlice.reducer,
	puzzles: puzzlesSlice.reducer,
	packs: packsSlice.reducer,
}
const appReducer = combineReducers(reducers)

export type RootState = {
	currentUser: CurrentUserState
	puzzles: PuzzlesState
	packs: PacksState
}
const baseData: RootState = {
	currentUser: {
		signedIn: false,
	},
	puzzles: {},
	packs: [],
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
export const selectCurrentUser = ({
	currentUser: { phoneNumber, accessToken },
}: RootState) => ({
	signedIn: true,
	phoneNumber: phoneNumber!,
	accessToken: accessToken!,
})

export const selectPacks = ({ packs }: RootState) => packs
export const selectPack =
	(id: number) =>
	({ packs }: RootState) =>
		packs.find(({ id: packId }) => id === packId)!
export const selectCurrentPackId = ({ packs }: RootState) =>
	packs.length > 0 ? packs[packs.length - 1].id : null

export const selectPuzzle =
	(id: number) =>
	({ puzzles }: RootState) =>
		puzzles[id]
