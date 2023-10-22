import * as Updates from "expo-updates"

import { LocalStoreKey, LocalStoreService } from "../localStore"

export default async function checkForUpdates() {
	if (__DEV__) {
		return
	}

	try {
		const update = await Updates.checkForUpdateAsync()
		if (update.isAvailable) {
			const releaseNotes = (update.manifest?.extra as any).releaseNotes
			if (releaseNotes) {
				await LocalStoreService.setKey(
					LocalStoreKey.updateMessage,
					releaseNotes
				)
			}
			await Updates.fetchUpdateAsync()
			await Updates.reloadAsync()
			return true
		}
		return false
	} catch (error) {
		console.error("Error while checking for updates:", error)
	}
}
