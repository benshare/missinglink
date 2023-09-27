import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"
import { CurrentUserState, currentUserSlice } from "./currentUser"
import { DailyPuzzlesState, dailyPuzzlesSlice } from "./puzzles"

const reducers = {
	currentUser: currentUserSlice.reducer,
	dailyPuzzles: dailyPuzzlesSlice.reducer,
}
const appReducer = combineReducers(reducers)

export type RootState = {
	currentUser: CurrentUserState
	dailyPuzzles: DailyPuzzlesState
}
const baseData: RootState = {
	currentUser: {
		signedIn: false,
	},
	dailyPuzzles: {},
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

export const selectPuzzlesDates = (state: RootState) =>
	Object.keys(state.dailyPuzzles)
export const selectDailyPuzzle = (state: RootState, date: string) =>
	state.dailyPuzzles[date]
