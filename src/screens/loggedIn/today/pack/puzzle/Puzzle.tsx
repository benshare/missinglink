import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native"
import { Ref, useEffect, useState } from "react"

import Theme from "../../../../../style/Theme"
import { getHintIndex } from "../../../../../utils"
import { selectPuzzle } from "../../../../../store"
import useColorScheme from "../../../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function Puzzle({
	id,
	alreadyComplete,
	onCorrect,
	inputRef,
	inputState: [inputFocused, setInputFocused],
}: {
	id: number
	alreadyComplete: boolean
	onCorrect: () => void
	inputRef: Ref<TextInput>
	inputState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	let { data, hint } = useSelector(selectPuzzle(id))
	// hint = false
	const { before, after, solutions } = data
	const hintSolution = solutions[0]
	const hintIndex = getHintIndex(hintSolution)
	const screenWidth = Dimensions.get("window").width
	const letterMarginRatio = 5
	const marginUnits =
		hintSolution.length * letterMarginRatio + (hintSolution.length - 1)
	const marginWidth = (screenWidth - 40) / marginUnits
	const letterWidth = Math.min(marginWidth * letterMarginRatio, 50)

	const initialText = alreadyComplete ? hintSolution : ""
	const [guess, setGuess] = useState(initialText)
	const hintGuess =
		guess.length >= hintIndex
			? guess
					.slice(0, hintIndex)
					.concat(hintSolution[hintIndex])
					.concat(guess.slice(hintIndex))
			: ""
	const isCorrect = solutions.some(
		(solution) =>
			(hint ? hintGuess : guess).toLowerCase() === solution.toLowerCase()
	)

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
							marginTop: "30%",
							marginBottom: "30%",
					  },
			]}
		>
			<Text style={style.clue}>{before}</Text>
			<TextInput
				ref={inputRef}
				style={[
					style.solution,
					(isCorrect || alreadyComplete) && style.correct,
					hint && !alreadyComplete && { opacity: 0, width: "100%" },
					{ zIndex: 1 },
				]}
				value={guess.toLocaleUpperCase()}
				onChangeText={(newValue) => {
					setGuess(newValue)
					if (hint) {
						var valueToCheck =
							newValue.length >= hintIndex
								? newValue
										.slice(0, hintIndex)
										.concat(hintSolution[hintIndex])
										.concat(newValue.slice(hintIndex))
								: ""
					} else {
						valueToCheck = newValue
					}
					if (
						solutions.some(
							(solution) =>
								valueToCheck.toLowerCase() ===
								solution.toLowerCase()
						)
					) {
						onCorrect()
					}
				}}
				autoFocus={!alreadyComplete}
				onFocus={() => setInputFocused(true)}
				onBlur={() => setInputFocused(false)}
				editable={!alreadyComplete && !isCorrect}
				placeholder={inputFocused ? "" : "LINK"}
				maxLength={hint ? hintSolution.length - 1 : undefined}
			/>
			{hint && !alreadyComplete && (
				<View
					style={{
						position: "absolute",
						height: "100%",
						justifyContent: "center",
					}}
				>
					<View style={{ flexDirection: "row" }}>
						{[...hintSolution].map((char, index) => (
							<View
								id={`hint-letter${index}`}
								style={[
									style.hintLetter,
									{
										marginHorizontal: marginWidth / 2,
										width: letterWidth,
									},
								]}
							>
								<Text
									style={[
										style.solution,
										isCorrect && style.correct,
									]}
								>
									{index === hintIndex
										? char
										: index < hintIndex
										? guess.length > index
											? guess[index]
											: ""
										: guess.length + 1 > index
										? guess[index - 1]
										: ""}
								</Text>
							</View>
						))}
					</View>
				</View>
			)}
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
			textTransform: "uppercase",
			color: theme.colors.primary.light,
			textAlign: "center",
		},
		hintLetter: {
			borderColor: theme.colors.primary.light,
			borderStyle: "solid",
			borderBottomWidth: 5,
			justifyContent: "center",
		},
		correct: {
			color: theme.colors.highlight.green,
		},
	})
