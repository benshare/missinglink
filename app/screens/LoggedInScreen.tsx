import { LocalStoreKey, LocalStoreService } from "../localStore"
import { Text, TouchableOpacity, View } from "react-native"

import { RootScreenProps } from "../navigation"
import { useDispatch } from "react-redux"

export default function LoggedInScreen({
	navigation,
}: RootScreenProps<"LoggedInScreen">) {
	const dispatch = useDispatch()

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TouchableOpacity
				onPress={() => {
					dispatch({ type: "LOGOUT" })
					navigation.navigate("CreateAccountScreen")
					LocalStoreService.clearKey(LocalStoreKey.userToken)
				}}
			>
				<Text>Log out</Text>
			</TouchableOpacity>
		</View>
	)
}
