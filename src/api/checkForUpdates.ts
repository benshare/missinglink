import * as Updates from "expo-updates"

export default async function checkForUpdates() {
	if (__DEV__) {
		return
	}

	try {
		const update = await Updates.checkForUpdateAsync()
		if (update.isAvailable) {
			await Updates.fetchUpdateAsync()
			await Updates.reloadAsync()
		}
	} catch (error) {
		console.error("Error while checking for updates:", error)
	}
}
