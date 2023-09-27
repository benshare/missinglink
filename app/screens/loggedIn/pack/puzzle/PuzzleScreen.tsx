import { StyleSheet, View } from "react-native"

import Header from "../../../../components/Header"
import { PackScreenProps } from "../PackScreen"
import Theme from "../../../../style/Theme"
import useColorScheme from "../../../../hooks/useColorScheme"

export default function PuzzleScreen({
	route,
}: PackScreenProps<"PuzzleScreen">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { id } = route.params

	return (
		<View style={style.wrapper}>
			<Header title={`Puzzle ${id}`} backIcon />
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
	})
