import { StyleSheet, Text, TouchableOpacity } from "react-native"

import { PackParamList } from "./PackScreen"
import { StackNavigationProp } from "@react-navigation/stack"
import Theme from "../../../style/theme"
import { selectPuzzle } from "../../../store"
import useColorScheme from "../../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"

export default function PuzzlePreview({ id }: { id: number }) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { title, data } = useSelector(selectPuzzle(id))

	const navigation = useNavigation<StackNavigationProp<PackParamList>>()

	return (
		<TouchableOpacity
			style={style.wrapper}
			onPress={() => navigation.push("PuzzleScreen", { id })}
		>
			<Text style={style.text}>{title}</Text>
			<Text style={style.text}>{JSON.stringify(data)}</Text>
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
