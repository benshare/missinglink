import { FlatList, StyleSheet } from "react-native"

import Header from "../../../components/Header"
import Theme from "../../../style/theme"
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
				<Header title="Weekly challenges" titleSize={25} backIcon />
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
