import { FlatList, StyleSheet } from "react-native"

import CurrentUserStreak from "../../../components/CurrentUserStreak"
import Header from "../../../components/Header"
import Theme from "../../../style/Theme"
import WeekPreview from "./WeekPreview"
import { selectWeeks } from "../../../store"
import useColorScheme from "../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function AllWeeksScreen() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const weeks = useSelector(selectWeeks)
	return (
		<FlatList
			style={style.wrapper}
			ListHeaderComponent={
				<Header
					title="All weeks"
					backIcon
					RightElement={CurrentUserStreak}
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
	})
