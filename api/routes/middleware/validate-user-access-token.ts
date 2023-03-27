import { NextFunction, Request, Response } from "express"

import { AuthService } from "../../services/postgres/auth"
import { errorCodes } from "../routers/util"

export async function validateUserAccessToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const userAccessToken = req.headers["authorization"] as string
		if (!userAccessToken) {
			throw {
				name: errorCodes.invalidCredentials,
				message: "No authorization header set",
			}
		}

		const userId = await AuthService.getUserIdFromAccessToken(
			userAccessToken
		)

		res.locals.userAccessToken = userAccessToken
		res.locals.userId = userId
	} catch (err: any) {
		return res.status(400).send({ err: err.message })
	}
	next()
}
