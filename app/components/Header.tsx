import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import Theme from "../style/Theme"
import useColorScheme from "../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"

export default function Header({
	title,
	titleSize = 40,
	backIcon = false,
}: {
	title: string
	titleSize?: number
	backIcon?: boolean
}) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const navigation = useNavigation<any>()

	return (
		<View style={style.wrapper}>
			{backIcon && (
				<TouchableOpacity
					style={style.backArrowWrapper}
					hitSlop={20}
					onPress={() => navigation.pop()}
				>
					<FontAwesome
						name="long-arrow-left"
						size={25}
						color="gray"
					/>
				</TouchableOpacity>
			)}
			<Text style={[style.title, { fontSize: titleSize }]}>{title}</Text>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			position: "relative",
			paddingTop: 30,
			paddingBottom: 50,
		},
		backArrowWrapper: {
			alignSelf: "flex-start",
			marginLeft: 20,
		},
		title: {
			alignSelf: "center",
		},
	})
