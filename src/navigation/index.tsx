import * as SplashScreen from 'expo-splash-screen'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack'

import AuthScreen from '../screens/auth/AuthScreen'
import LoggedInScreen from '../screens/loggedIn/LoggedInScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Theme from '../style/Theme'
import checkForUpdates from '../api/checkForUpdates'
import { selectIsSignedIn } from '../store'
import useCachedResources from '../hooks/useCachedResources'
import { useCallback } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { useSelector } from 'react-redux'

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
			initialRouteName={signedIn ? 'LoggedInScreen' : 'AuthScreen'}
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
	const appIsReady = useCachedResources()
	checkForUpdates()

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
				<RootScreen />
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
