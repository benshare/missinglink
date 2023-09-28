import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import AccountScreen from "./account/AccountScreen"
import AllWeeksScreen from "./allWeeks/AllWeeksScreen"
import Header from "../../components/Header"
import { StackScreenProps } from "@react-navigation/stack"
import Theme from "../../style/theme"
import WeekScreen from "./week/WeekScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { selectCurrentWeek } from "../../store"
import useColorScheme from "../../hooks/useColorScheme"
import { useInitialLoad } from "../../api/initialLoad"
import { useSelector } from "react-redux"

export type LoggedInScreenParamList = {
	Home: undefined
	WeekScreen: { id: number }
	AllWeeksScreen: undefined
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
			<Header title="Missing Link" />
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
				<Text style={style.buttonText}>Past Puzzles</Text>
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
	useInitialLoad()

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
			paddingBottom: 200,
			paddingHorizontal: 30,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
		},
		button: {
			padding: 20,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "gray",
			borderRadius: 40,
			alignSelf: "center",
			minWidth: "70%",
		},
		buttonText: {
			fontSize: 30,
			textAlign: "center",
		},
	})
