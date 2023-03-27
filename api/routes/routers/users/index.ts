import express, { Request, Response, Router } from "express"

import { useAddRoute } from "../util"
import { validateRequest } from "../../middleware"

export default function initUsersRouter(): Router {
	const router = express.Router()
	const addRoute = useAddRoute(router)

	addRoute({
		routeName: "create-account",
		method: "POST",
		useAuth: false,
		middleware: [validateRequest],
		body: async (req: Request, res: Response) => {
			const { verifiedNumberCode, handle } = req.body //as CreateAccountRequest

			//res.send({ userAccessToken } as CreateAccountResponse)
		},
	})

	addRoute({
		routeName: "delete-account",
		method: "DELETE",
		body: async (_req: Request, res: Response) => {
			const userId = res.locals.userId

			res.send({})
		},
	})

	addRoute({
		routeName: "update-push-token",
		method: "POST",
		body: async (req: Request, res: Response) => {
			const userId = res.locals.userId
			const { token } = req.body //as UpdatePushTokenRequest
			res.send({})
		},
	})

	addRoute({
		routeName: "clear-push-token",
		method: "DELETE",
		body: async (_req: Request, res: Response) => {
			const userId = res.locals.userId

			res.send({})
		},
	})

	return router
}
