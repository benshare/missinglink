import { NextFunction, Request, Response } from "express"

import { validationResult } from "express-validator"

export async function validateRequest(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		var error = "Invalid values for parameters: "
		var skip = false
		for (const e of errors.array()) {
			if (skip) {
				skip = false
			} else {
				error += e.param + ", "
				skip = true
			}
		}
		return res.status(400).send({
			err: error.slice(0, -2),
		})
	}
	next()
}
