import * as Network from "expo-network"

import { LocalStoreKey, LocalStoreService } from "../localStore"
import { useEffect, useState } from "react"

import { tokenRestored } from "../store/currentUser"
import { useDispatch } from "react-redux"

// TODO: convert to a backend check
async function authorizeToken(token: string) {
	return null
}

export default function useCachedResources() {
	const dispatch = useDispatch()

	const [networkConnected, setNetworkConnected] = useState(false)
	const [isRestoring, setIsRestoring] = useState(false)

	async function getNetworkState() {
		const { isInternetReachable } = await Network.getNetworkStateAsync()
		setNetworkConnected(isInternetReachable!)
	}

	const restoreToken = async () => {
		let userToken: string | null
		try {
			userToken = await LocalStoreService.getKey(LocalStoreKey.userToken)
			if (!userToken) {
				throw null
			}
		} catch {
			setIsRestoring(false)
			return
		}
		try {
			await authorizeToken(userToken)
		} catch {
			setIsRestoring(false)
			if (!__DEV__) {
				LocalStoreService.clearKey(LocalStoreKey.userToken)
			}
			return
		}
		dispatch(tokenRestored(userToken))
	}

	const isLoadingComplete = !isRestoring && networkConnected

	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				await getNetworkState()
				await restoreToken()
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e)
			}
		}

		loadResourcesAndDataAsync()
	}, [])

	return isLoadingComplete
}
