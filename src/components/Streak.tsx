import { Animated, Easing, StyleSheet, Text } from "react-native"

import { FontAwesome5 } from "@expo/vector-icons"
import Theme from "../style/Theme"
import useColorScheme from "../hooks/useColorScheme"
import { useEffect } from "react"

export default function Streak({
	streak,
	pulse,
	size = 25,
}: {
	streak: number | null
	pulse?: boolean
	size?: number
}) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const opacity = new Animated.Value(pulse ? 0.5 : 1)

	const setPulse = () => {
		Animated.sequence([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: false,
			}),
			Animated.timing(opacity, {
				toValue: 0.2,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: false,
			}),
		]).start(() => {
			setPulse()
		})
	}
	useEffect(() => {
		if (pulse) {
			setPulse()
		}
	}, [])

	return Boolean(streak) ? (
		<Animated.View style={[style.streakWrapper, { opacity }]}>
			<FontAwesome5 name="fire" size={size} color="red" />
			<Text style={[style.streakNumber, { fontSize: size }]}>
				{streak}
			</Text>
		</Animated.View>
	) : undefined
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		streakWrapper: {
			flexDirection: "row",
		},
		streakNumber: {
			marginLeft: 5,
			color: theme.colors.highlight.red,
		},
	})
