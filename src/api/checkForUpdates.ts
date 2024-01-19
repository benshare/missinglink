import * as Updates from "expo-updates"

import { LocalStoreKey, LocalStoreService } from "../localStore"

import { delay } from "../utils"

export default async function checkForUpdates(showUpdateRequired: () => void) {
	if (__DEV__) {
		return
	}

	try {
		const update = await Updates.checkForUpdateAsync()
		if (update.isAvailable) {
			showUpdateRequired()
			await Updates.fetchUpdateAsync()
			const releaseNotes = (update.manifest?.extra as any).releaseNotes
			if (releaseNotes) {
				await LocalStoreService.setKey(
					LocalStoreKey.updateMessage,
					releaseNotes
				)
			}
			await delay(2000)
			await Updates.reloadAsync()
			return true
		}
		return false
	} catch (error) {
		console.error("Error while checking for updates:", error)
	}
}
