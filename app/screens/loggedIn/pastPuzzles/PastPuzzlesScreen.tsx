import { FlatList, StyleSheet } from "react-native"

import Header from "../../../components/Header"
import PackPreview from "./PackPreview"
import Theme from "../../../style/Theme"
import useColorScheme from "../../../hooks/useColorScheme"

export default function PastPuzzlesScreen() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const puzzleTitles = [
		"Week 1",
		"Week 2",
		"Week 3",
		"Week 4",
		"Week 5",
		"Week 6",
	]
	return (
		<FlatList
			style={style.wrapper}
			ListHeaderComponent={
				<Header title="Weekly challenges" titleSize={30} backIcon />
			}
			data={puzzleTitles}
			renderItem={({ item: title }) => <PackPreview {...{ title }} />}
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
