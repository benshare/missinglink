import { StyleSheet, Text, View } from "react-native"

import Streak from "../../../components/Streak"
import Theme from "../../../style/Theme"
import useColorScheme from "../../../hooks/useColorScheme"

export default function Row({
	username,
	streak,
	rank,
	first,
	last,
}: {
	username: string
	streak: number
	rank: number
	first: boolean
	last: boolean
}) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	return (
		<View
			style={[style.row, first && style.firstRow, last && style.lastRow]}
		>
			<Text style={style.rank}>{rank}</Text>
			<View style={style.divider} />
			<Text style={style.username}>{username}</Text>
			<View style={style.divider} />
			<View style={style.streak}>
				<Streak streak={streak} />
			</View>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		row: {
			flexDirection: "row",
			borderColor: theme.colors.primary.main,
			borderLeftWidth: 1,
			borderRightWidth: 1,
			borderStyle: "solid",
			alignItems: "center",
		},
		firstRow: {
			borderTopWidth: 1,
			borderTopLeftRadius: 5,
			borderTopRightRadius: 5,
		},
		lastRow: {
			borderBottomWidth: 1,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5,
		},
		rank: {
			flex: 1,
			fontSize: 20,
			color: theme.colors.primary.main,
			padding: 10,
			textAlign: "center",
		},
		username: {
			flex: 4,
			fontSize: 20,
			color: theme.colors.primary.main,
			padding: 10,
			textAlign: "center",
		},
		streak: {
			flex: 5,
			justifyContent: "center",
			flexDirection: "row",
			alignItems: "center",
			padding: 10,
		},
		divider: {
			backgroundColor: theme.colors.primary.main,
			width: 1,
			height: "100%",
		},
	})
