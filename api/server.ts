import * as express from "express"
import * as pg from "pg"

import getConfig from "./config"
import initUsersRouter from "./routes/routers/users"

const { local, postgresInfo } = getConfig()

export default async function startServer() {
	const app = express.default()
	app.use(express.json({ limit: "1mb" }))
	app.use(express.urlencoded({ extended: false, limit: "1mb" }))
	// These are alphabetical

	app.get("/", (_req, res) => {
		res.send({ ok: true })
	})

	if (local) {
		const apiPort = 3001
		app.listen(apiPort, () => {
			console.log(`API server listening on port ${apiPort}!`)
		})
	} else {
		const apiPort = 8080
		const server = app.listen(apiPort, () => {})
		server.keepAliveTimeout = 62 * 1000
		console.log(`API server listening on port ${apiPort}!`)
	}

	initUsersRouter()
}
export let pool = new pg.Pool(postgresInfo)
