import { StyleSheet, View } from "react-native"

import Header from "../../../../components/Header"
import Theme from "../../../../style/theme"
import { WeekScreenProps } from "../WeekScreen"
import { selectPack } from "../../../../store"
import useColorScheme from "../../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function PackScreen({ route }: WeekScreenProps<"PackScreen">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { id } = route.params
	const { title, puzzles } = useSelector(selectPack(id))

	return (
		<View style={style.wrapper}>
			<Header title={`Pack ${title}`} backIcon />
			<Header title={`Puzzles: ${puzzles.length}`} backIcon />
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
