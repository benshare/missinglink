import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import {
	selectIsLastPackForWeek,
	selectPack,
	selectWeek,
} from "../../../../store"
import { useRef, useState } from "react"

import Header from "../../../../components/Header"
import Puzzle from "./puzzle/Puzzle"
import Theme from "../../../../style/theme"
import Updates from "../../../../api/updates"
import { WeekScreenProps } from "../WeekScreen"
import useColorScheme from "../../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function PackScreen({
	navigation,
	route,
}: WeekScreenProps<"PackScreen">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { id } = route.params
	const { puzzles, weekId } = useSelector(selectPack(id))
	const isLastPack = useSelector(selectIsLastPackForWeek(id))
	const { status: weekStatus } = useSelector(selectWeek(weekId))

	const previousPuzzlesComplete = puzzles.map(({ complete }) => complete)

	function nextIncompleteIndex(fromIndex: number) {
		for (let offset = 0; offset < puzzles.length; offset++) {
			const newIndex = (fromIndex + offset) % puzzles.length
			if (!puzzles[newIndex].complete) {
				return newIndex
			}
		}
		return 0
	}

	const [index, setIndex] = useState(nextIncompleteIndex(0))
	const currentPuzzle = puzzles[index]

	const goToNextPuzzle = () => setIndex((index + 1) % puzzles.length)
	const goToNextIncompletePuzzle = () =>
		setIndex(nextIncompleteIndex(index + 1))

	const NextPuzzle = () => (
		<TouchableOpacity hitSlop={20} onPress={goToNextPuzzle}>
			<Text style={style.skip}>Skip</Text>
		</TouchableOpacity>
	)

	const inputRef = useRef<TextInput>(null)

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
						alreadyComplete={puzzles[index].complete}
						onCorrect={() => {
							Keyboard.dismiss()
							Updates.puzzleComplete(
								id,
								index,
								previousPuzzlesComplete,
								isLastPack,
								weekId,
								weekStatus
							)
							const packComplete =
								previousPuzzlesComplete.reduce(
									(before, current) =>
										before + (current ? 1 : 0),
									0
								) +
									1 ===
								puzzles.length
							if (packComplete) {
								setTimeout(() => navigation.pop(), 1000)
								if (isLastPack) {
									setTimeout(() => navigation.pop(), 2000)
								}
							} else {
								setTimeout(goToNextIncompletePuzzle, 1000)
								// TODO: make this happen in a natural way
								//
								// setTimeout(
								// 	() => inputRef.current?.focus(),
								// 	1500
								// )
							}
						}}
						inputRef={inputRef}
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
		skip: {
			fontSize: 20,
			color: "gray",
		},
	})
