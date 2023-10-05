import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type ActionPayload = {
	signIn: { accessToken: string; phoneNumber: string }
	profileLoaded: {
		id: string
		username: string | null
		current_streak: number
		max_streak: number
	}
}
export type CurrentUserState = {
	signedIn: boolean
	accessToken?: string
	phoneNumber?: string
	profile?: {
		userId: string
		username: string | null
		currentStreak: number
		maxStreak: number
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
				payload: {
					id: userId,
					username,
					current_streak: currentStreak,
					max_streak: maxStreak,
				},
			}: PayloadAction<ActionPayload["profileLoaded"]>
		) => {
			return {
				...store,
				profile: { userId, username, currentStreak, maxStreak },
			}
		},
	},
})

export const { signedIn, profileLoaded } = currentUserSlice.actions
