import {
	Animated,
	Dimensions,
	Easing,
	StyleSheet,
	View,
	ViewProps,
} from "react-native"
import React, { ReactNode, useEffect, useState } from "react"

import Blurred from "./Blurred"
import Theme from "../style/Theme"
import useColorScheme from "../hooks/useColorScheme"

function Floater() {
	const theme = Theme[useColorScheme()]

	const screenWidth = Dimensions.get("window").width
	const screenHeight = Dimensions.get("window").height

	const translateX = new Animated.Value(0)
	const translateY = new Animated.Value(0)

	const radius = Math.ceil(Math.random() * 5) + 5

	const r = Math.floor(Math.random() * (screenWidth + screenHeight))
	const top = r > screenWidth ? r - screenWidth : -2 * radius
	const left = r > screenWidth ? screenWidth + 2 * radius : r

	const velocity = 0.01

	const xDelta = left + radius * 2
	const yDelta = screenHeight - top + radius * 2

	useEffect(() => {
		Animated.timing(translateX, {
			toValue: -xDelta,
			duration: xDelta / velocity,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start()
		Animated.timing(translateY, {
			toValue: yDelta,
			duration: yDelta / velocity,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start()
	}, [])

	return (
		<Animated.View
			style={{
				position: "absolute",
				top: top - radius,
				left: left - radius,
				width: radius * 2,
				height: radius * 2,
				transform: [{ translateX }, { translateY }],
				zIndex: -1,
			}}
		>
			<Blurred radius={50} color={theme.colors.primary.main} />
		</Animated.View>
	)
}

export default function FloatersView({ children, ...props }: ViewProps) {
	const [floaters, setFloaters] = useState<ReactNode[]>([])

	function addFloater(index: number) {
		const floater = <Floater key={index} />
		setFloaters((previous) => [...previous, floater])
		setTimeout(() => setFloaters((previous) => previous.slice(1)), 60000)
	}
	useEffect(() => {
		let index = 0
		addFloater(index)
		const timer = setInterval(() => {
			index++
			addFloater(index)
		}, 8000)
		return () => {
			clearInterval(timer)
			setFloaters([])
		}
	}, [])
	return (
		<View
			{...props}
			style={[props.style, { position: "relative", zIndex: -1 }]}
		>
			{children}
			{[floaters]}
		</View>
	)
}
