import { DayOfWeek, DayOfWeekText, PackStatus } from "../../../types/puzzle"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import PackScreen from "./pack/PackScreen"
import { StackNavigationProp } from "@react-navigation/stack"
import Theme from "../../../style/theme"
import { WeekParamList } from "./WeekScreen"
import { selectPack } from "../../../store"
import useColorScheme from "../../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"

export default function PackPreview({ id }: { id: number }) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const navigation = useNavigation<StackNavigationProp<WeekParamList>>()

	const { title, status } = useSelector(selectPack(id))

	return (
		<TouchableOpacity
			style={style.wrapper}
			onPress={() => navigation.push("PackScreen", { id })}
		>
			{status === PackStatus.complete && (
				<FontAwesome name="check" style={style.icon} size={60} />
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
			position: "relative",
		},
		text: {
			fontSize: 20,
		},
		icon: {
			position: "absolute",
			color: "green",
			zIndex: 1,
			opacity: 0.8,
		},
	})
