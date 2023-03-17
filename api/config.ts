import * as dotenv from "dotenv"

type Config = {
	local: boolean
	postgresInfo: any
	tables: {
		// These are alphabetical
	}
	// stripe: {
	// 	secretKey: string
	// 	enpointSecret: string
	// }
	// aws: {
	// 	awsAccessKeyId: string
	// 	awsSecretAccessKey: string
	// 	awsRegion: string
	// 	s3AssetsBucket: string
	// }
	// minimumVersionRequired: string
}

let config: Config | null = null

function loadConfig() {
	const local = process.env.LOCAL === "true"
	if (local) {
		var env = dotenv.config({
			path: ".env",
		}).parsed
	} else {
		env = process.env
	}
	// const rdsSecrets: any = JSON.parse(env.RDS_SECRETS!)
	config = {
		local,
		postgresInfo: {
			// ...rdsSecrets,
			// user: rdsSecrets.username,
			// database: "postgres",
			// connectionTimeoutMillis: 10000,
		},
		tables: {},
		// stripe: {
		// 	secretKey: env.STRIPE_SK!,
		// 	enpointSecret: env.STRIPE_ENDPOINT_SECRET!,
		// },
		// aws: {
		// 	awsRegion: env.AWS_REGION,
		// 	awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
		// 	awsSecretAccessKey: env.AWS_SECRET_ACCESS_KEY,
		// 	s3AssetsBucket: env.S3_ASSETS_BUCKET,
		// },
		// minimumVersionRequired: env.MINIMUM_VERSION_REQUIRED,
	}
}

export default function getConfig() {
	if (config === null) {
		loadConfig()
	}
	return config!
}
