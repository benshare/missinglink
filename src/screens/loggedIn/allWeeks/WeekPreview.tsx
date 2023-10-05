import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { WeekStatus, WeeklyChallenge } from "../../../types/puzzle"

import { FontAwesome } from "@expo/vector-icons"
import { LoggedInScreenParamList } from "../LoggedInScreen"
import { StackNavigationProp } from "@react-navigation/stack"
import Theme from "../../../style/theme"
import useColorScheme from "../../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"

export default function WeekPreview({ id, title, status }: WeeklyChallenge) {
	const theme = Theme[useColorScheme()]
	const style = styles(theme)

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
					style={[style.icon, { color: theme.colors.primary.light }]}
					size={60}
				/>
			)}
			{status === WeekStatus.complete && (
				<FontAwesome
					name="check"
					style={[
						style.icon,
						{ color: theme.colors.highlight.green },
					]}
					size={60}
				/>
			)}
			{status === WeekStatus.pastIncomplete && (
				<FontAwesome
					name="close"
					style={[
						style.icon,
						{ color: theme.colors.highlight.red, opacity: 0.2 },
					]}
					size={60}
				/>
			)}
			{status === WeekStatus.pastComplete && (
				<FontAwesome
					name="check"
					style={[
						style.icon,
						{ color: theme.colors.highlight.green, opacity: 0.2 },
					]}
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
			borderColor: theme.colors.primary.light,
			borderRadius: 10,
			width: "40%",
			aspectRatio: 1,
			justifyContent: "center",
			alignItems: "center",
			marginBottom: "20%",
		},
		text: {
			fontSize: 20,
			color: theme.colors.primary.main,
		},
		icon: {
			position: "absolute",
			zIndex: 1,
			opacity: 0.8,
		},
	})
