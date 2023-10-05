import { FlatList, StyleSheet, View } from "react-native"

import Header from "../../../components/Header"
import Row from "./Row"
import Theme from "../../../style/Theme"
import { selectLeaderboard } from "../../../store"
import useColorScheme from "../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function LeaderboardScreen() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const leaderboard = useSelector(selectLeaderboard)

	return (
		<FlatList
			style={style.wrapper}
			ListHeaderComponent={<Header title="Leaderboard" backIcon />}
			data={leaderboard}
			renderItem={({
				item: { username, currentStreak: streak },
				index,
			}) => (
				<Row
					{...{
						rank: index + 1,
						username,
						streak,
						first: index === 0,
						last: index === leaderboard.length - 1,
					}}
				/>
			)}
			ItemSeparatorComponent={() => <View style={style.divider} />}
			showsVerticalScrollIndicator={false}
		/>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			width: "100%",
			height: "100%",
			paddingTop: 80,
			paddingHorizontal: 30,
			position: "relative",
		},
		contentContainer: {
			borderColor: theme.colors.primary.main,
			borderWidth: 1,
			borderStyle: "solid",
			borderRadius: 5,
		},
		text: {
			fontSize: 20,
			color: theme.colors.primary.main,
		},
		divider: {
			backgroundColor: theme.colors.primary.main,
			height: 1,
			width: "100%",
		},
	})
