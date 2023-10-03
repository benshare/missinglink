import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { WeekStatus, WeeklyChallenge } from "../../../types/puzzle"

import { FontAwesome } from "@expo/vector-icons"
import { LoggedInScreenParamList } from "../LoggedInScreen"
import { StackNavigationProp } from "@react-navigation/stack"
import Theme from "../../../style/theme"
import useColorScheme from "../../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"

export default function WeekPreview({ id, title, status }: WeeklyChallenge) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const navigation =
		useNavigation<StackNavigationProp<LoggedInScreenParamList>>()

	return (
		<TouchableOpacity
			style={style.wrapper}
			onPress={() => navigation.push("WeekScreen", { id })}
			disabled={status === WeekStatus.locked}
		>
			{status === WeekStatus.locked && (
				<FontAwesome
					name="lock"
					style={[style.icon, { color: "gray" }]}
					size={60}
				/>
			)}
			{status === WeekStatus.complete && (
				<FontAwesome
					name="check"
					style={[style.icon, { color: "green" }]}
					size={60}
				/>
			)}
			{status === WeekStatus.pastIncomplete && (
				<FontAwesome
					name="close"
					style={[style.icon, { color: "red", opacity: 0.2 }]}
					size={60}
				/>
			)}
			{status === WeekStatus.pastComplete && (
				<FontAwesome
					name="check"
					style={[style.icon, { color: "green", opacity: 0.2 }]}
					size={60}
				/>
			)}
			<Text style={style.text}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			padding: 10,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "gray",
			borderRadius: 10,
			width: "40%",
			aspectRatio: 1,
			justifyContent: "center",
			alignItems: "center",
			marginBottom: "20%",
		},
		text: {
			fontSize: 20,
		},
		icon: {
			position: "absolute",
			zIndex: 1,
			opacity: 0.8,
		},
	})
