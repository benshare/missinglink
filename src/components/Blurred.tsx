import { Circle, Defs, RadialGradient, Stop, Svg } from "react-native-svg"
import { ColorValue, StyleSheet, View } from "react-native"

import React from "react"

export default function Blurred({
	radius,
	color,
}: {
	radius: number
	color: ColorValue
}) {
	return (
		<View style={styles.container}>
			<Svg style={{ width: radius * 2, height: radius * 2 }}>
				<Defs>
					<RadialGradient
						id="grad"
						cx="50%"
						cy="50%"
						r="50%"
						gradientUnits="userSpaceOnUse"
					>
						<Stop offset="0%" stopColor={color} stopOpacity="0.4" />
						<Stop offset="100%" stopColor={color} stopOpacity="0" />
					</RadialGradient>
				</Defs>
				<Circle cx="50%" cy="50%" r="50%" fill="url(#grad)" />
			</Svg>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
})
