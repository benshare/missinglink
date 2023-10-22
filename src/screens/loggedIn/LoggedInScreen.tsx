import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import AccountScreen from "./account/AccountScreen"
import AllPuzzlesScreen from "./allPuzzles/AllPuzzlesScreen"
import CurrentUserStreak from "../../components/CurrentUserStreak"
import FloatersView from "../../components/FloatersView"
import LeaderboardScreen from "./leaderboard/LeaderboardScreen"
import Logo from "../../components/Logo"
import PackScreen from "./today/pack/PackScreen"
import { StackScreenProps } from "@react-navigation/stack"
import Theme from "../../style/Theme"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { selectCurrentPack } from "../../store"
import useColorScheme from "../../hooks/useColorScheme"
import { useEffect } from "react"
import { useInitialLoad } from "../../api/initialLoad"
import { useSelector } from "react-redux"
import useSubscribeToUpdates from "../../api/subscriptions"

export type LoggedInScreenParamList = {
	Home: undefined
	PackScreen: { id: number }
	AllPuzzlesScreen: undefined
	LeaderboardScreen: undefined
	AccountScreen: undefined
}

const Stack = createNativeStackNavigator<LoggedInScreenParamList>()
export type LoggedInScreenProps<Screen extends keyof LoggedInScreenParamList> =
	StackScreenProps<LoggedInScreenParamList, Screen>

function Home({ navigation }: LoggedInScreenProps<"Home">) {
	const theme = Theme[useColorScheme()]
	const style = styles(theme)

	const currentPackId = useSelector(selectCurrentPack)

	return (
		<FloatersView style={style.wrapper}>
			<View
				style={{
					position: "absolute",
					top: 70,
					right: 40,
				}}
			>
				<CurrentUserStreak size={30} />
			</View>
			<Logo />
			<View style={{ height: 20 }} />
			<TouchableOpacity
				style={style.button}
				onPress={() =>
					navigation.push("PackScreen", { id: currentPackId! })
				}
			>
				<Text style={style.buttonText}>Play</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={style.button}
				onPress={() => navigation.push("AllPuzzlesScreen")}
			>
				<Text style={style.buttonText}>All Puzzles</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={style.button}
				onPress={() => navigation.push("LeaderboardScreen")}
			>
				<Text style={style.buttonText}>Leaderboard</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={style.button}
				onPress={() => navigation.push("AccountScreen")}
			>
				<Text style={style.buttonText}>Account</Text>
			</TouchableOpacity>
		</FloatersView>
	)
}

export default function LoggedInScreen() {
	const doInitialLoad = useInitialLoad()

	useEffect(() => {
		doInitialLoad()
	}, [])

	useSubscribeToUpdates()

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
			}}
		>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="PackScreen" component={PackScreen} />
			<Stack.Screen
				name="AllPuzzlesScreen"
				component={AllPuzzlesScreen}
			/>
			<Stack.Screen
				name="LeaderboardScreen"
				component={LeaderboardScreen}
			/>
			<Stack.Screen name="AccountScreen" component={AccountScreen} />
		</Stack.Navigator>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			width: "100%",
			height: "100%",
			paddingTop: 150,
			paddingBottom: 120,
			paddingHorizontal: 30,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
		},
		button: {
			padding: 18,
			borderWidth: 2,
			borderStyle: "solid",
			borderColor: theme.colors.primary.main,
			borderRadius: 40,
			alignSelf: "center",
			minWidth: "70%",
			color: theme.colors.primary.main,
		},
		buttonText: {
			fontSize: 30,
			fontWeight: "600",
			textAlign: "center",
			color: theme.colors.primary.main,
		},
	})
