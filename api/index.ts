import startServer from "./server"

async function run() {
	startServer()
}

const redOutput = "\x1b[31m%s\x1b[0m"

run().catch((e) => {
	console.error(redOutput, e)
	process.exit(1)
})

process.on("unhandledRejection", (reason, p) => {
	console.error("Unhandled Rejection at: Promise", p, "reason:", reason)
})
