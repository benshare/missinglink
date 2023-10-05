import { StyleSheet, Text, View } from "react-native"

import { ReactNode } from "react"
import Theme from "../../../style/Theme"
import useColorScheme from "../../../hooks/useColorScheme"

export default function Row({
	label,
	RightItem,
}: {
	label: string
	RightItem: () => ReactNode
}) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	return (
		<View style={style.row}>
			<Text style={style.label}>{label}</Text>
			<View>
				<RightItem />
			</View>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		row: {
			marginHorizontal: 30,
			flexDirection: "row",
			justifyContent: "space-between",
			marginVertical: 20,
		},
		text: {
			fontSize: 20,
			color: theme.colors.primary.main,
		},
		label: {
			fontSize: 20,
			color: theme.colors.primary.main,
		},
	})
