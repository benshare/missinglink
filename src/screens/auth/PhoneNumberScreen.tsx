import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

import { AuthScreenProps } from "./AuthScreen"
import PhoneNumberInput from "../../components/PhoneNumberInput"
import Theme from "../../style/theme"
import { supabase } from "../../api/supabase"
import useColorScheme from "../../hooks/useColorScheme"
import { useState } from "react"

export default function PhoneNumberScreen({
	navigation,
}: AuthScreenProps<"PhoneNumberScreen">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

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
	}

	return (
		<View style={style.wrapper}>
			<Text style={style.title1}>Welcome to</Text>
			<Text style={style.title2}>Missing Link</Text>

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
					<ActivityIndicator />
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
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			marginTop: 100,
		},
		title1: {
			fontSize: 30,
			fontWeight: "200",
		},
		title2: {
			fontSize: 40,
			fontWeight: "400",
		},
		label: {
			marginTop: 120,
			textAlign: "center",
			fontSize: 25,
			color: "gray",
		},
		input: {
			marginTop: 30,
			minWidth: 100,
			textAlign: "center",
			fontSize: 30,
		},
		button: {
			marginTop: 50,
			borderColor: theme.colors.primary.lighter,
			borderWidth: 1,
			borderStyle: "solid",
			padding: 10,
			paddingHorizontal: 15,
			borderRadius: 10,
		},
		buttonText: {
			fontSize: 15,
		},
	})
