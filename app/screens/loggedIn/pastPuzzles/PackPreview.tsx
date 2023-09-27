import { StyleSheet, Text, TouchableOpacity } from "react-native"

import { LoggedInScreenParamList } from "../LoggedInScreen"
import { StackNavigationProp } from "@react-navigation/stack"
import Theme from "../../../style/Theme"
import useColorScheme from "../../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"

export default function PackPreview({ title }: { title: string }) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const navigation =
		useNavigation<StackNavigationProp<LoggedInScreenParamList>>()

	return (
		<TouchableOpacity
			style={style.wrapper}
			onPress={() => navigation.push("PackScreen", { id: title })}
		>
			<Text style={style.text}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			padding: 10,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "gray",
			borderRadius: 10,
			width: "40%",
			aspectRatio: 1,
			justifyContent: "center",
			alignItems: "center",
			marginBottom: "20%",
		},
		text: {
			fontSize: 20,
		},
	})
