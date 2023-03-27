import { NextFunction, Request, Response, Router } from "express"

import cors from "cors"
import { validateRequest } from "../middleware"
import { validateUserAccessToken } from "../middleware/validate-user-access-token"

function addRoute({
	router,
	routeName,
	method,
	useAuth = true,
	requestValidation,
	middleware = [],
	body,
}: {
	router: Router
	routeName?: string
	method: "GET" | "POST" | "DELETE"
	useAuth?: boolean
	requestValidation?: any[]
	middleware?: ((
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<Response<any, Record<string, any>>>)[]
	body: (req: Request, res: Response) => Promise<void>
}) {
	const route = routeName ? "/" + routeName : ""
	const requestValidationParams = requestValidation
		? [requestValidation, validateRequest]
		: []
	const middlewareParams = [
		...(useAuth ? [validateUserAccessToken] : []),
		...middleware,
	]
	const bodyParam = async (req: Request, res: Response) => {
		try {
			await body(req, res)
		} catch (err: any) {
			const status = getCodeForError(err.name)
			res.status(status).send({
				err: err.message,
			})
		}
	}

	router.options(route, function (_req: any, res: Response) {
		res.setHeader("Access-Control-Allow-Origin", "*")
		res.setHeader("Access-Control-Allow-Methods", method)
		res.setHeader(
			"Access-Control-Allow-Headers",
			useAuth ? "Content-Type, Authorization" : "Content-Type"
		)
		res.end()
	})
	switch (method) {
		case "GET":
			router.get(
				route,
				cors(),
				...requestValidationParams,
				...middlewareParams,
				bodyParam
			)
			break
		case "DELETE":
			router.delete(
				route,
				cors(),
				...requestValidationParams,
				...middlewareParams,
				bodyParam
			)
			break
		case "POST":
			router.post(
				route,
				cors(),
				...requestValidationParams,
				...middlewareParams,
				bodyParam
			)
	}
}

export function useAddRoute(router: Router) {
	return ({
		routeName,
		method,
		useAuth = true,
		requestValidation,
		middleware = [],
		body,
	}: {
		routeName?: string
		method: "GET" | "POST" | "DELETE"
		useAuth?: boolean
		requestValidation?: any[]
		middleware?: ((
			req: Request,
			res: Response,
			next: NextFunction
		) => Promise<Response<any, Record<string, any>>>)[]
		body: (req: Request, res: Response) => Promise<void>
	}) =>
		addRoute({
			router,
			routeName,
			method,
			useAuth,
			requestValidation,
			middleware,
			body,
		})
}

export const errorCodes = {
	invalidCredentials: "Invalid credentials",
	invalidParameter: "Invalid parameter",
}

export function getCodeForError(error: string) {
	if (Object.values(errorCodes).includes(error)) {
		return 403
	}
	return 500
}
