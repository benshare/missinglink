import * as SplashScreen from "expo-splash-screen"

import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"

import CreateAccountScreen from "../screens/CreateAccountScreen"
import LoggedInScreen from "../screens/LoggedInScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Theme from "../style/Theme"
import { selectCurrentUser } from "../store"
import useCachedResources from "../hooks/useCachedResources"
import { useCallback } from "react"
import useColorScheme from "../hooks/useColorScheme"
import { useSelector } from "react-redux"

export type RootParamList = {
	CreateAccountScreen: undefined
	LoggedInScreen: undefined
}
export type RootScreenProps<Screen extends keyof RootParamList> =
	StackScreenProps<RootParamList, Screen>
const RootStack = createStackNavigator<RootParamList>()

function RootScreen() {
	const { signedIn } = useSelector(selectCurrentUser)

	return (
		<RootStack.Navigator
			screenOptions={{
				animationEnabled: false,
				headerShown: false,
			}}
			initialRouteName={
				signedIn ? "LoggedInScreen" : "CreateAccountScreen"
			}
		>
			<RootStack.Screen
				name="CreateAccountScreen"
				component={CreateAccountScreen}
			/>
			<RootStack.Screen
				name="LoggedInScreen"
				component={LoggedInScreen}
			/>
		</RootStack.Navigator>
	)
}

export default function Navigation() {
	const theme = useColorScheme()
	const appIsReady = useCachedResources()

	// TODO: Add linking

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync()
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
				<RootScreen />
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
