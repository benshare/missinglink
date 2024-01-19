import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native"
import {
	selectCurrentUser,
	selectIsLastPackForWeek,
	selectPack,
	selectPuzzle,
	selectWeek,
} from "../../../../store"
import { useRef, useState } from "react"

import FloatersView from "../../../../components/FloatersView"
import { FontAwesome } from "@expo/vector-icons"
import Header from "../../../../components/Header"
import { LoggedInScreenProps } from "../../LoggedInScreen"
import Puzzle from "./puzzle/Puzzle"
import Theme from "../../../../style/Theme"
import Updates from "../../../../api/updates"
import useColorScheme from "../../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function PackScreen({
	navigation,
	route,
}: LoggedInScreenProps<"PackScreen">) {
	const theme = Theme[useColorScheme()]
	const style = styles(theme)

	const { id } = route.params
	const { puzzles, weekId } = useSelector(selectPack(id))
	const isLastPack = useSelector(selectIsLastPackForWeek(id))
	const { status: weekStatus } = useSelector(selectWeek(weekId))
	const hints = useSelector(selectCurrentUser.hints)

	const puzzleComplete = Updates.usePuzzleComplete()

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
	const { hint } = useSelector(selectPuzzle(currentPuzzle.id))
	const hintUsed = Updates.useHintUsed(currentPuzzle.id)

	const goToNextPuzzle = () => setIndex((index + 1) % puzzles.length)
	const goToNextIncompletePuzzle = () =>
		setIndex(nextIncompleteIndex(index + 1))

	const NextPuzzle = () => (
		<TouchableOpacity hitSlop={20} onPress={goToNextPuzzle}>
			<Text style={style.next}>Next</Text>
		</TouchableOpacity>
	)

	const inputRef = useRef<TextInput>(null)
	const inputState = useState(false)

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView behavior="position" enabled>
				<FloatersView style={style.wrapper}>
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
							puzzleComplete(
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
						inputState={inputState}
					/>
					{!inputState[0] && (
						<TouchableOpacity
							style={[
								style.hints,
								(hint ||
									hints === 0 ||
									currentPuzzle.complete) && { opacity: 0.4 },
							]}
							onPress={hintUsed}
							disabled={
								hint || hints === 0 || currentPuzzle.complete
							}
						>
							<Text style={style.hintsText}>{hints}</Text>
							<FontAwesome
								name="lightbulb-o"
								size={40}
								color={theme.colors.highlight.yellow}
							/>
						</TouchableOpacity>
					)}
				</FloatersView>
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
		next: {
			fontSize: 20,
			color: theme.colors.primary.light,
		},
		hints: {
			backgroundColor: "white",
			borderRadius: 100,
			width: "auto",
			padding: 20,
			aspectRatio: 1,
			alignSelf: "flex-end",
			justifyContent: "center",
			alignItems: "flex-end",
			marginBottom: 50,
			flexDirection: "row",
			shadowColor: "black",
			shadowOpacity: 0.5,
			shadowRadius: 1,
			shadowOffset: { width: 0, height: 0 },
		},
		hintsText: {
			fontSize: 25,
			color: theme.colors.highlight.yellow,
			marginRight: 8,
		},
	})
