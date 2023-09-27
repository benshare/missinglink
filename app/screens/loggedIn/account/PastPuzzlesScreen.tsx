import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import Header from "../../../components/Header"
import { LoggedInScreenProps } from "../LoggedInScreen"
import Theme from "../../../style/Theme"
import useColorScheme from "../../../hooks/useColorScheme"

export default function AccountScreen({
	navigation,
}: LoggedInScreenProps<"AccountScreen">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	return (
		<View style={style.wrapper}>
			<Header title="Account" backIcon />
			<Text>Logged in as {}</Text>
			<TouchableOpacity>
				<Text>Log out</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			padding: 30,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
		},
		header: {
			position: "relative",
		},
		backArrowWrapper: {
			position: "absolute",
			left: 20,
		},
		title: {
			fontSize: 30,
		},
	})
