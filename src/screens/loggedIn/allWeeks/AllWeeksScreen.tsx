import { FlatList, StyleSheet, Text, View } from "react-native"
import { selectStreaks, selectWeeks } from "../../../store"

import { FontAwesome5 } from "@expo/vector-icons"
import Header from "../../../components/Header"
import Theme from "../../../style/theme"
import WeekPreview from "./WeekPreview"
import useColorScheme from "../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function AllWeeksScreen() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const weeks = useSelector(selectWeeks)
	const streak = useSelector(selectStreaks)

	const StreakIcon = Boolean(streak)
		? () => (
				<View style={style.streakWrapper}>
					<FontAwesome5 name="fire" size={22} color="red" />
					<Text style={style.streakNumber}>{streak}</Text>
				</View>
		  )
		: undefined
	return (
		<FlatList
			style={style.wrapper}
			ListHeaderComponent={
				<Header
					title="Weekly challenges"
					titleSize={25}
					backIcon
					RightElement={StreakIcon}
				/>
			}
			data={weeks}
			renderItem={({ item: week }) => <WeekPreview {...week} />}
			numColumns={2}
			columnWrapperStyle={{
				justifyContent: "space-between",
			}}
			showsVerticalScrollIndicator={false}
		/>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			padding: 30,
		},
		streakWrapper: {
			flexDirection: "row",
		},
		streakNumber: {
			marginLeft: 5,
			color: "red",
			fontSize: 22,
		},
	})
