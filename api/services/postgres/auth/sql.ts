import getConfig from "../../../config"

const {
	tables: { usersTable },
} = getConfig()

export const getUserId = `
	select user_id from ${usersTable}
	where user_access_token = $1
`

export const getAccessTokenFromPhoneNumber = `
	select user_access_token from ${usersTable}
	where phone_number = $1
`
