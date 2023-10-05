import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import AccountScreen from "./account/AccountScreen"
import AllWeeksScreen from "./allWeeks/AllWeeksScreen"
import LeaderboardScreen from "./leaderboard/LeaderboardScreen"
import Logo from "../../components/Logo"
import { StackScreenProps } from "@react-navigation/stack"
import Theme from "../../style/Theme"
import WeekScreen from "./week/WeekScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { selectCurrentWeek } from "../../store"
import useColorScheme from "../../hooks/useColorScheme"
import { useEffect } from "react"
import { useInitialLoad } from "../../api/initialLoad"
import { useSelector } from "react-redux"
import useSubscribeToUpdates from "../../api/subscriptions"

export type LoggedInScreenParamList = {
	Home: undefined
	WeekScreen: { id: number }
	AllWeeksScreen: undefined
	LeaderboardScreen: undefined
	AccountScreen: undefined
}

const Stack = createNativeStackNavigator<LoggedInScreenParamList>()
export type LoggedInScreenProps<Screen extends keyof LoggedInScreenParamList> =
	StackScreenProps<LoggedInScreenParamList, Screen>

function Home({ navigation }: LoggedInScreenProps<"Home">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const currentId = useSelector(selectCurrentWeek)

	return (
		<View style={style.wrapper}>
			<Logo />
			<View style={{ height: 20 }} />
			<TouchableOpacity
				style={style.button}
				onPress={() =>
					navigation.push("WeekScreen", { id: currentId! })
				}
			>
				<Text style={style.buttonText}>Play</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={style.button}
				onPress={() => navigation.push("AllWeeksScreen")}
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
		</View>
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
			<Stack.Screen name="WeekScreen" component={WeekScreen} />
			<Stack.Screen name="AllWeeksScreen" component={AllWeeksScreen} />
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
