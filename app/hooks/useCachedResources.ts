import * as Network from "expo-network"

import { LocalStoreKey, LocalStoreService } from "../localStore"
import { useEffect, useState } from "react"

import { signedIn } from "../store/currentUser"
import { useDispatch } from "react-redux"

// TODO: convert to a real check
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
		try {
			var accessToken = await LocalStoreService.getKey(
				LocalStoreKey.userToken
			)
			if (!accessToken) {
				throw null
			}
			await authorizeToken(accessToken)
			var phoneNumber = await LocalStoreService.getKey(
				LocalStoreKey.phoneNumber
			)
			if (!phoneNumber) {
				throw null
			}
		} catch {
			setIsRestoring(false)
			return
		}
		dispatch(signedIn({ accessToken, phoneNumber }))
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
