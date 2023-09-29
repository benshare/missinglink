import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import Header from "../../../../components/Header"
import Puzzle from "./puzzle/Puzzle"
import Theme from "../../../../style/theme"
import Updates from "../../../../api/updates"
import { WeekScreenProps } from "../WeekScreen"
import { selectPack } from "../../../../store"
import useColorScheme from "../../../../hooks/useColorScheme"
import { useSelector } from "react-redux"
import { useState } from "react"

export default function PackScreen({ route }: WeekScreenProps<"PackScreen">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { id } = route.params
	const { puzzles } = useSelector(selectPack(id))

	const [index, setIndex] = useState(0)
	const currentPuzzle = puzzles[index]
	const previousComplete = puzzles.map(({ complete }) => complete)

	const goToNextPuzzle = () => setIndex((index + 1) % puzzles.length)

	const NextPuzzle = () => (
		<TouchableOpacity hitSlop={20} onPress={goToNextPuzzle}>
			<FontAwesome name="long-arrow-right" size={25} color="gray" />
		</TouchableOpacity>
	)

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView behavior="position" enabled>
				<View style={style.wrapper}>
					<Header
						title={`${index + 1} / ${puzzles.length}`}
						backIcon
						RightElement={NextPuzzle}
					/>
					<Puzzle
						id={currentPuzzle.id}
						onCorrect={() => {
							Keyboard.dismiss()
							Updates.puzzleComplete(id, index, previousComplete)
							setTimeout(goToNextPuzzle, 1000)
						}}
					/>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			padding: 30,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			height: "100%",
		},
	})
