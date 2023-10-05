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
			<Text style={style.text}>Your number: {phoneNumber}</Text>
			<TouchableOpacity
				onPress={handleSignOut}
				style={style.logoutButton}
			>
				<Text style={style.logoutText}>Log out</Text>
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
			paddingHorizontal: 30,
			alignItems: "center",
			position: "relative",
		},
		text: {
			fontSize: 20,
			color: theme.colors.primary.main,
		},
		logoutButton: {
			borderColor: theme.colors.primary.light,
			borderWidth: 1,
			borderStyle: "solid",
			borderRadius: 20,
			padding: 10,
			paddingHorizontal: 15,
			position: "absolute",
			bottom: 100,
		},
		logoutText: {
			fontSize: 20,
			textAlign: "center",
			color: theme.colors.primary.light,
		},
	})
