import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type ActionPayload = {
	signIn: string
}
export type CurrentUserState = {
	signedIn: boolean
	userAccessToken: string | undefined
}

export const currentUserSlice = createSlice({
	name: "currentUser",
	initialState: {
		signedIn: false,
	} as CurrentUserState,
	reducers: {
		tokenRestored: (
			_,
			{ payload: token }: PayloadAction<ActionPayload["signIn"]>
		) => {
			return {
				signedIn: true,
				userAccessToken: token,
			}
		},
	},
})

export const { tokenRestored } = currentUserSlice.actions
