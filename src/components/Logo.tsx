import { Animated, Easing, StyleSheet, View } from "react-native"
import { useEffect, useState } from "react"

import Theme from "../style/Theme.ts"
import { setIntervalLimited } from "../utils"
import useColorScheme from "../hooks/useColorScheme"

export default function Logo() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const title = "Missing Link"

	const [visibleLetters, setVisibleLetters] = useState(0)
	const [bounces, _] = useState(
		title.split("").map((_) => new Animated.Value(0))
	)

	useEffect(() => {
		setTimeout(
			() =>
				setIntervalLimited(
					(index: number) => {
						setVisibleLetters((current) => current + 1)
						Animated.timing(bounces[index], {
							toValue: 1,
							duration: 150,
							easing: Easing.bezier(0.17, 0.67, 0.83, 0.67),
							useNativeDriver: false,
						}).start()
					},
					75,
					title.length
				),
			500
		)
	}, [])

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			<View style={style.textWrapper}>
				{title.split("").map((letter, index) => (
					<Animated.Text
						key={index}
						style={[
							style.text,
							{
								transform: [
									{
										translateY: bounces[index].interpolate({
											inputRange: [0, 0.5, 1],
											outputRange: [0, -10, 0],
										}),
									},
								],
								opacity: index < visibleLetters ? 1 : 0,
							},
						]}
					>
						{letter}
					</Animated.Text>
				))}
			</View>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		textWrapper: {
			flexDirection: "row",
			justifyContent: "center",
			paddingHorizontal: 20,
			paddingVertical: 8,
		},
		text: {
			fontSize: 45,
			textAlign: "center",
			color: theme.colors.primary.main,
			fontWeight: "800",
		},
	})
