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
		userAccessToken: undefined,
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
// export enum RootStoreActions {
// 	logout = "LOGOUT",
// }

export const selectCurrentUser = (state: RootState) => state.currentUser
export const selectPuzzlesDates = (state: RootState) =>
	Object.keys(state.dailyPuzzles)
export const selectDailyPuzzle = (state: RootState, date: string) =>
	state.dailyPuzzles[date]
