import { Animated, Easing, StyleSheet, Text } from "react-native"

import { FontAwesome5 } from "@expo/vector-icons"
import Theme from "../style/Theme"
import { selectStreaks } from "../store"
import useColorScheme from "../hooks/useColorScheme"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function Streak() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const streak = useSelector(selectStreaks)
	const opacity = new Animated.Value(0.5)

	const pulse = () => {
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
			pulse()
		})
	}
	useEffect(() => {
		pulse()
	}, [])

	return Boolean(streak) ? (
		<Animated.View style={[style.streakWrapper, { opacity }]}>
			<FontAwesome5 name="fire" size={25} color="red" />
			<Text style={style.streakNumber}>{streak}</Text>
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
			fontSize: 25,
		},
	})
