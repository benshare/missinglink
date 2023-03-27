import { getAccessTokenFromPhoneNumber, getUserId } from "./sql"

import { errorCodes } from "../../../routes/routers/util"
import { pool } from "../../../server"

export class AuthService {
	static async initialize() {}

	static async getUserIdFromAccessToken(userAccessToken: string) {
		const rows: { user_id: string }[] = await pool
			.query(getUserId, [userAccessToken])
			.then((result) => result.rows)
		if (rows.length === 0) {
			throw {
				name: errorCodes.invalidCredentials,
				message: "No user with provided access token",
			}
		}
		return rows[0].user_id
	}

	static async getAccessTokenFromPhoneNumber(phoneNumber: string) {
		const rows: { user_access_token: string }[] = await pool
			.query(getAccessTokenFromPhoneNumber, [phoneNumber])
			.then((result) => result.rows)
		if (rows.length === 0) {
			return null
		}
		return rows[0].user_access_token
	}
}
