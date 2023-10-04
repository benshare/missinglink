import { Animated, Easing, View } from "react-native"
import { useEffect, useState } from "react"

import { setIntervalLimited } from "../utils"

export default function Logo() {
	const title = "Missing Link"

	const [visibleLetters, setVisibleLetters] = useState(0)
	const [bounces, _] = useState(
		title.split("").map((_) => new Animated.Value(0))
	)

	useEffect(() => {
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
		)
	}, [])

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			{title.split("").map((letter, index) => (
				<Animated.Text
					key={index}
					style={{
						fontSize: 40,
						textAlign: "center",
						transform: [
							{
								translateY: bounces[index].interpolate({
									inputRange: [0, 0.5, 1],
									outputRange: [0, -10, 0],
								}),
							},
						],
						opacity: index < visibleLetters ? 1 : 0,
					}}
				>
					{letter}
				</Animated.Text>
			))}
		</View>
	)
}
