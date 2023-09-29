import { LocalStoreKey, LocalStoreService } from "../../../localStore"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { selectCurrentUser, signOut } from "../../../store"

import Header from "../../../components/Header"
import { RootParamList } from "../../../navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import Theme from "../../../style/theme"
import useColorScheme from "../../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"

export default function AccountScreen() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const phoneNumber = useSelector(selectCurrentUser.phoneNumber)

	const parentNavigator = useNavigation<StackNavigationProp<RootParamList>>()

	const handleSignOut = () => {
		signOut()
		LocalStoreService.clearKey(LocalStoreKey.userToken)
		LocalStoreService.clearKey(LocalStoreKey.phoneNumber)
		parentNavigator.navigate("AuthScreen")
	}

	return (
		<View style={style.wrapper}>
			<Header title="Account" backIcon />
			<Text style={style.text}>Logged in as {phoneNumber}</Text>
			<TouchableOpacity onPress={handleSignOut}>
				<Text style={style.text}>Log out</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			width: "100%",
			height: "100%",
			paddingTop: 80,
			paddingBottom: 200,
			paddingHorizontal: 30,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			alignItems: "center",
		},
		text: {
			fontSize: 20,
		},
		button: {
			padding: 20,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "gray",
			borderRadius: 40,
			alignSelf: "center",
			minWidth: "70%",
		},
		buttonText: {
			fontSize: 30,
			textAlign: "center",
		},
	})
