import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import { ReactNode } from "react"
import Theme from "../style/theme"
import useColorScheme from "../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"

export default function Header({
	title,
	titleSize = 40,
	backIcon = false,
	RightElement,
}: {
	title: string
	titleSize?: number
	backIcon?: boolean
	RightElement?: () => ReactNode
}) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const navigation = useNavigation<any>()

	return (
		<View style={style.wrapper}>
			<View style={style.leftWrapper}>
				{backIcon && (
					<TouchableOpacity
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
			</View>
			<Text style={[style.title, { fontSize: titleSize }]}>{title}</Text>

			<View style={style.rightWrapper}>
				{RightElement && <RightElement />}
			</View>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			paddingTop: 30,
			paddingBottom: 50,
			flexDirection: "row",
			width: "100%",
		},
		leftWrapper: {
			flex: 1,
			justifyContent: "center",
			alignItems: "flex-start",
		},
		title: {
			flex: 5,
			alignSelf: "center",
			textAlign: "center",
		},
		rightWrapper: {
			flex: 1,
			justifyContent: "center",
			alignItems: "flex-end",
		},
	})
