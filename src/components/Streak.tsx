import { StyleSheet, Text, View } from "react-native"

import { FontAwesome5 } from "@expo/vector-icons"
import Theme from "../style/theme"
import { selectStreaks } from "../store"
import useColorScheme from "../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function Streak() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const streak = useSelector(selectStreaks)
	return Boolean(streak) ? (
		<View style={style.streakWrapper}>
			<FontAwesome5 name="fire" size={22} color="red" />
			<Text style={style.streakNumber}>{streak}</Text>
		</View>
	) : undefined
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		streakWrapper: {
			flexDirection: "row",
		},
		streakNumber: {
			marginLeft: 5,
			color: "red",
			fontSize: 22,
		},
	})
