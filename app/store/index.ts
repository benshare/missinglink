import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"

import { currentUserSlice } from "./currentUser"

const reducers = {
	currentUser: currentUserSlice.reducer,
}
const appReducer = combineReducers(reducers)

export type RootState = {
	currentUser: {
		signedIn: boolean
		userAccessToken: string | undefined
	}
}
const baseData: RootState = {
	currentUser: {
		signedIn: false,
		userAccessToken: undefined,
	},
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
