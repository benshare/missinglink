import { FlatList, StyleSheet } from "react-native"

import Header from "../../../components/Header"
import PackPreview from "./PackPreview"
import Theme from "../../../style/theme"
import { selectPacks } from "../../../store"
import useColorScheme from "../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function PastPuzzlesScreen() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const packs = useSelector(selectPacks)
	return (
		<FlatList
			style={style.wrapper}
			ListHeaderComponent={
				<Header title="Weekly challenges" titleSize={30} backIcon />
			}
			data={packs}
			renderItem={({ item: pack }) => <PackPreview {...pack} />}
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
