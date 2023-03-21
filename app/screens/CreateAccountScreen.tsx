import { Text, TouchableOpacity, View } from "react-native"

import { RootScreenProps } from "../navigation"

export default function CreateAccountScreen({
	navigation,
}: RootScreenProps<"CreateAccountScreen">) {
	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TouchableOpacity onPress={() => navigation.push("LoggedInScreen")}>
				<Text>Log in</Text>
			</TouchableOpacity>
		</View>
	)
}
