import { PuzzleData, PuzzleType } from "../../../../../types/puzzle"
import { Ref, useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

import Theme from "../../../../../style/Theme"
import { selectPuzzle } from "../../../../../store"
import useColorScheme from "../../../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function Puzzle({
	id,
	alreadyComplete,
	onCorrect,
	inputRef,
}: {
	id: number
	alreadyComplete: boolean
	onCorrect: () => void
	inputRef: Ref<TextInput>
}) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { data } = useSelector(selectPuzzle(id))
	const { before, after, solution } = data as PuzzleData[PuzzleType.standard]

	const initialText = alreadyComplete ? solution : ""
	const [guess, setGuess] = useState(initialText)
	const isCorrect = guess.toLowerCase() === solution.toLowerCase()

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
			<Text style={style.clue}>{before}</Text>
			<TextInput
				ref={inputRef}
				style={[style.solution, isCorrect && style.correct]}
				value={guess.toLocaleUpperCase()}
				onChangeText={(newValue) => {
					setGuess(newValue)
					if (newValue.toLowerCase() === solution.toLowerCase()) {
						onCorrect()
					}
				}}
				autoFocus={!alreadyComplete}
				onFocus={() => setInputFocused(true)}
				onBlur={() => setInputFocused(false)}
				editable={!alreadyComplete && !isCorrect}
				placeholder={inputFocused ? "" : "LINK"}
			/>
			<Text style={style.clue}>{after}</Text>
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
			textTransform: "uppercase",
			color: theme.colors.primary.main,
		},
		solution: {
			fontSize: 40,
			color: theme.colors.primary.light,
		},
		correct: {
			color: theme.colors.highlight.green,
		},
	})
