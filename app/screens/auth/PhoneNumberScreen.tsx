import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { useRef, useState } from "react"

import { AuthScreenProps } from "./AuthScreen"
import PhoneInput from "react-native-phone-number-input"
import Theme from "../../style/Theme"
import { supabase } from "../../supabase"
import useColorScheme from "../../hooks/useColorScheme"

export default function PhoneNumberScreen({
	navigation,
}: AuthScreenProps<"PhoneNumberScreen">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const phoneInputRef = useRef<PhoneInput>(null)
	const [numberFormatted, setNumberFormatted] = useState("")
	const [isValid, setIsValid] = useState(false)

	const [loading, setLoading] = useState(false)

	async function signIn() {
		setLoading(true)
		const { error } = await supabase.auth.signInWithOtp({
			phone: numberFormatted!,
		})
		setLoading(false)
		if (error) {
			console.log({ error })
			return
		}
		navigation.push("VerifyCodeScreen", { phoneNumber: numberFormatted })
	}

	return (
		<View
			style={{
				width: "100%",
				height: "80%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<PhoneInput
				ref={phoneInputRef}
				defaultValue={numberFormatted}
				defaultCode="US"
				layout="second"
				onChangeText={(newValue) => {
					setIsValid(phoneInputRef.current!.isValidNumber(newValue))
				}}
				onChangeFormattedText={(newValue) => {
					setNumberFormatted(newValue)
				}}
				withShadow
				autoFocus
				disabled={loading}
			/>
			<TouchableOpacity
				onPress={signIn}
				disabled={!isValid || loading}
				style={[
					style.button,
					!isValid && { opacity: 0.3 },
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
