import { StyleSheet, Text, View } from "react-native"

import Theme from "../../style/Theme"
import useColorScheme from "../../hooks/useColorScheme"

export default function UpdateRequired() {
	const theme = Theme[useColorScheme()]
	const style = styles(theme)

	return (
		<>
			<View style={style.background} />
			<View style={style.wrapper}>
				<View style={style.container}>
					<Text style={style.title}>Update Found</Text>
					<Text style={style.message}>
						We've got something new for you. Just a few seconds...
					</Text>
				</View>
			</View>
		</>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		background: {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			opacity: 0.8,
			backgroundColor: "black",
		},
		wrapper: {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			padding: 30,
			justifyContent: "center",
		},
		container: {
			width: "100%",
			backgroundColor: theme.colors.background,
			borderRadius: 20,
			padding: 50,
			paddingVertical: 100,
			flexDirection: "column",
		},
		close: {
			position: "absolute",
			top: 30,
			right: 30,
		},
		title: {
			fontSize: 35,
			fontWeight: "600",
			color: theme.colors.primary.main,
			marginBottom: 50,
		},
		message: {
			fontSize: 25,
			color: theme.colors.primary.main,
		},
	})
