import * as SplashScreen from "expo-splash-screen"

import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { LocalStoreKey, LocalStoreService } from "../localStore"
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"
import { useCallback, useEffect, useState } from "react"

import AuthScreen from "../screens/auth/AuthScreen"
import LoggedInScreen from "../screens/loggedIn/LoggedInScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Theme from "../style/Theme"
import UpdateMessage from "../components/modals/UpdateMessage"
import UpdateRequired from "../components/modals/UpdateRequired"
import checkForUpdates from "../api/checkForUpdates"
import { selectIsSignedIn } from "../store"
import useCachedResources from "../hooks/useCachedResources"
import useColorScheme from "../hooks/useColorScheme"
import { useSelector } from "react-redux"

export type RootParamList = {
	AuthScreen: undefined
	LoggedInScreen: undefined
}
export type RootScreenProps<Screen extends keyof RootParamList> =
	StackScreenProps<RootParamList, Screen>
const RootStack = createStackNavigator<RootParamList>()

function RootScreen() {
	const signedIn = useSelector(selectIsSignedIn)

	return (
		<RootStack.Navigator
			screenOptions={{
				animationEnabled: false,
				headerShown: false,
			}}
			initialRouteName={signedIn ? "LoggedInScreen" : "AuthScreen"}
		>
			<RootStack.Screen name="AuthScreen" component={AuthScreen} />
			<RootStack.Screen
				name="LoggedInScreen"
				component={LoggedInScreen}
			/>
		</RootStack.Navigator>
	)
}

export default function Navigation() {
	const theme = useColorScheme()
	const resourcesLoaded = useCachedResources()
	const [updateLoaded, setUpdateLoaded] = useState(false)
	const appIsReady = resourcesLoaded && updateLoaded

	const [showUpdateRequired, setShowUpdateRequired] = useState(false)
	const [updateMessage, setUpdateMessage] = useState<string>()
	const [showUpdateMessage, setShowUpdateMessage] = useState(false)

	useEffect(() => {
		async function getUpdate() {
			const isUpdate = await checkForUpdates(() =>
				setShowUpdateRequired(true)
			)
			if (isUpdate) {
				return
			}
			const message = await LocalStoreService.getKey(
				LocalStoreKey.updateMessage
			)
			if (message) {
				await LocalStoreService.clearKey(LocalStoreKey.updateMessage)
				setUpdateMessage(message)
				setShowUpdateMessage(true)
			}
			setUpdateLoaded(true)
		}
		getUpdate()
	}, [])

	// TODO: Add linking

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			setTimeout(SplashScreen.hideAsync, 500)
		}
	}, [appIsReady])

	if (!appIsReady) {
		return null
	}
	return (
		<SafeAreaProvider>
			<NavigationContainer
				theme={{
					...DefaultTheme,
					colors: {
						...DefaultTheme.colors,
						background: Theme[theme].colors.background,
					},
				}}
				onReady={() =>
					// TODO instead of calling this onReady, call it onLayout of the root View
					setTimeout(() => {
						onLayoutRootView()
					}, 200)
				}
			>
				<>
					<RootScreen />
					{showUpdateRequired && <UpdateRequired />}
					{showUpdateMessage && (
						<UpdateMessage
							message={updateMessage!}
							onClose={() => setShowUpdateMessage(false)}
						/>
					)}
				</>
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
