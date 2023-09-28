import { StyleSheet, Text, TouchableOpacity } from "react-native"

import { LoggedInScreenParamList } from "../LoggedInScreen"
import { PuzzlePack } from "../../../types/puzzle"
import { StackNavigationProp } from "@react-navigation/stack"
import Theme from "../../../style/theme"
import useColorScheme from "../../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"

export default function PackPreview({
	id,
	title,
	progress,
	puzzles,
}: PuzzlePack) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const navigation =
		useNavigation<StackNavigationProp<LoggedInScreenParamList>>()

	return (
		<TouchableOpacity
			style={style.wrapper}
			onPress={() => navigation.push("PackScreen", { id })}
		>
			<Text style={style.text}>{title}</Text>
			<Text style={style.text}>Status: {progress.status}</Text>
			<Text style={style.text}>Num puzzles: {puzzles.length}</Text>
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
	})
