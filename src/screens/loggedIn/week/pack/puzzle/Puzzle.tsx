import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native"
import { PuzzleData, PuzzleType } from "../../../../../types/puzzle"
import { useEffect, useRef, useState } from "react"

import Theme from "../../../../../style/theme"
import { selectPuzzle } from "../../../../../store"
import useColorScheme from "../../../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function Puzzle({ id }: { id: number }) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { data } = useSelector(selectPuzzle(id))
	const { before, after, solution } = data as PuzzleData[PuzzleType.standard]

	const [guess, setGuess] = useState("")
	const isCorrect = guess === solution
	function handleCorrect() {
		Keyboard.dismiss()
	}

	const inputRef = useRef<TextInput>(null)
	const [inputFocused, setInputFocused] = useState(true)

	// TODO: not sure why this is needed
	useEffect(() => {
		setGuess("")
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
					setGuess(newValue)
					if (newValue === solution) {
						handleCorrect()
					}
				}}
				autoFocus
				onFocus={() => setInputFocused(true)}
				onBlur={() => setInputFocused(false)}
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
		},
		solution: {
			fontSize: 40,
			color: "gray",
		},
	})
