import { StyleSheet, Text, TouchableOpacity } from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import { PackStatus } from "../../../types/puzzle"
import { StackNavigationProp } from "@react-navigation/stack"
import Theme from "../../../style/Theme"
import { WeekParamList } from "../allPuzzles/WeekScreen"
import { selectPack } from "../../../store"
import useColorScheme from "../../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"

export default function PackPreview({ id }: { id: number }) {
	const theme = Theme[useColorScheme()]
	const style = styles(theme)

	const navigation = useNavigation<StackNavigationProp<WeekParamList>>()

	const { title, status } = useSelector(selectPack(id))

	return (
		<TouchableOpacity
			style={style.wrapper}
			onPress={() => navigation.push("PackScreen", { id })}
			disabled={status === PackStatus.locked}
		>
			{status === PackStatus.locked && (
				<FontAwesome
					name="lock"
					style={[style.icon, { color: theme.colors.primary.light }]}
					size={60}
				/>
			)}
			{status === PackStatus.inProgress && (
				<FontAwesome
					name="circle-o-notch"
					style={[style.icon, { color: theme.colors.primary.light }]}
					size={60}
				/>
			)}
			{status === PackStatus.complete && (
				<FontAwesome
					name="check"
					style={[
						style.icon,
						{ color: theme.colors.highlight.green },
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
			position: "relative",
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
