import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type ActionPayload = {
	signIn: { accessToken: string; phoneNumber: string }
}
export type CurrentUserState = {
	signedIn: boolean
	accessToken?: string
	phoneNumber?: string
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
	},
})

export const { signedIn } = currentUserSlice.actions
