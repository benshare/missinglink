import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type ActionPayload = {
	signIn: { accessToken: string; phoneNumber: string }
	profileLoaded: { username: string | null; current_streak: number }
}
export type CurrentUserState = {
	signedIn: boolean
	accessToken?: string
	phoneNumber?: string
	profile?: {
		username: string | null
		streak: number
	}
}

export const currentUserSlice = createSlice({
	name: "currentUser",
	initialState: {
		signedIn: false,
	} as CurrentUserState,
	reducers: {
		signedIn: (_, { payload }: PayloadAction<ActionPayload["signIn"]>) => {
			return {
				signedIn: true,
				...payload,
			}
		},
		profileLoaded: (
			store,
			{
				payload: { username, current_streak: streak },
			}: PayloadAction<ActionPayload["profileLoaded"]>
		) => {
			return {
				...store,
				profile: { username, streak },
			}
		},
	},
})

export const { signedIn, profileLoaded } = currentUserSlice.actions
