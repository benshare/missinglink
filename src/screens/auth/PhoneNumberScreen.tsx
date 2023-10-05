import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

import { AuthScreenProps } from "./AuthScreen"
import Logo from "../../components/Logo"
import PhoneNumberInput from "../../components/PhoneNumberInput"
import Theme from "../../style/theme"
import { supabase } from "../../api/supabase"
import useColorScheme from "../../hooks/useColorScheme"
import { useState } from "react"

export default function PhoneNumberScreen({
	navigation,
}: AuthScreenProps<"PhoneNumberScreen">) {
	const theme = Theme[useColorScheme()]
	const style = styles(theme)

	const [number, setNumber] = useState("")
	const [isValid, setIsValid] = useState(false)

	const [loading, setLoading] = useState(false)

	async function signIn() {
		setLoading(true)
		const formatted = `+1${number}`
		const { error } = await supabase.auth.signInWithOtp({
			phone: formatted!,
		})
		setLoading(false)
		if (error) {
			console.error({ error })
			return
		}
		navigation.push("VerifyCodeScreen", { phoneNumber: formatted })
		setNumber("")
		setIsValid(false)
	}

	return (
		<View style={style.wrapper}>
			<Logo />
			<Text style={style.label}>What's your number?</Text>
			<PhoneNumberInput
				value={number}
				onChangeText={setNumber}
				autoFocus
				style={style.input}
				setIsValid={setIsValid}
				editable={!loading}
			/>
			<TouchableOpacity
				onPress={signIn}
				disabled={!isValid || loading}
				style={[
					style.button,
					!isValid && { opacity: 0 },
					loading && { borderWidth: 0 },
				]}
			>
				{loading ? (
					<ActivityIndicator color={theme.colors.primary.light} />
				) : (
					<Text style={style.buttonText}>Verify</Text>
				)}
			</TouchableOpacity>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			backgroundColor: theme.colors.background,
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			marginTop: 150,
		},
		label: {
			marginTop: 80,
			textAlign: "center",
			fontSize: 20,
			color: theme.colors.primary.light,
		},
		input: {
			marginTop: 15,
			minWidth: 100,
			textAlign: "center",
			fontSize: 35,
			color: theme.colors.primary.main,
		},
		button: {
			marginTop: 80,
			borderColor: theme.colors.primary.main,
			borderWidth: 1,
			borderStyle: "solid",
			padding: 8,
			paddingHorizontal: 10,
			borderRadius: 5,
		},
		buttonText: {
			fontSize: 15,
			color: theme.colors.primary.main,
		},
		spinner: {
			color: theme.colors.primary.light,
		},
	})
