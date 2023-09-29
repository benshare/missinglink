import { PuzzleData, PuzzleType } from "../../../../../types/puzzle"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { useEffect, useRef, useState } from "react"

import Theme from "../../../../../style/theme"
import { selectPuzzle } from "../../../../../store"
import { sentenceCase } from "../../../../../utils"
import useColorScheme from "../../../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function Puzzle({
	id,
	alreadyComplete,
	onCorrect,
}: {
	id: number
	alreadyComplete: boolean
	onCorrect: () => void
}) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { data } = useSelector(selectPuzzle(id))
	const { before, after, solution } = data as PuzzleData[PuzzleType.standard]

	const initialText = alreadyComplete ? sentenceCase(solution) : ""
	const [guess, setGuess] = useState(initialText)
	const isCorrect = guess.toLowerCase() === solution.toLowerCase()

	const inputRef = useRef<TextInput>(null)
	const [inputFocused, setInputFocused] = useState(false)

	// TODO: not sure why this is needed
	useEffect(() => {
		setGuess(initialText)
	}, [id])

	return (
		<View
			style={[
				style.wrapper,
				inputFocused
					? {
							marginTop: "70%",
							marginBottom: "10%",
					  }
					: {
							marginTop: "40%",
							marginBottom: "40%",
					  },
			]}
		>
			<Text style={style.clue}>{sentenceCase(before)}</Text>
			<TextInput
				ref={inputRef}
				style={[
					style.solution,
					!inputFocused &&
						guess.length === 0 && {
							minWidth: 100,
							borderBottomWidth: 2,
							borderBottomColor: "gray",
						},
					isCorrect && { color: "green" },
				]}
				value={guess}
				onChangeText={(newValue) => {
					setGuess(sentenceCase(newValue))
					if (newValue.toLowerCase() === solution.toLowerCase()) {
						onCorrect()
					}
				}}
				autoFocus={!alreadyComplete}
				onFocus={() => setInputFocused(true)}
				onBlur={() => setInputFocused(false)}
				editable={!alreadyComplete && !isCorrect}
			/>
			<Text style={style.clue}>{sentenceCase(after)}</Text>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			flex: 1,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			alignItems: "center",
		},
		clue: {
			fontSize: 40,
		},
		solution: {
			fontSize: 40,
			color: "gray",
		},
	})
