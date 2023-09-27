import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { useRef, useState } from "react"

import { Input } from "react-native-elements"
import PhoneInput from "react-native-phone-number-input"
import { RootScreenProps } from "../navigation"
import Theme from "../style/Theme"
import { supabase } from "../supabase"
import useColorScheme from "../hooks/useColorScheme"

export default function AuthScreen({
	navigation,
}: RootScreenProps<"AuthScreen">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const phoneInputRef = useRef<PhoneInput>(null)
	const [numberRaw, setNumberRaw] = useState("4155426323")
	const [numberFormatted, setNumberFormatted] = useState("4155426323")
	const [isValid, setIsValid] = useState(false)

	const [loading, setLoading] = useState(false)

	async function signIn() {
		setLoading(true)
		const { error, data } = await supabase.auth.signInWithOtp({
			phone: numberFormatted!,
		})
		console.log({ data, error })
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
					setNumberRaw(newValue)
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
