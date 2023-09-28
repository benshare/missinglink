import {
	ActivityIndicator,
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"
import { LocalStoreKey, LocalStoreService } from "../../localStore"
import { useEffect, useRef, useState } from "react"

import { AuthScreenProps } from "./AuthScreen"
import { Input } from "react-native-elements"
import { RootParamList } from "../../navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import Theme from "../../style/theme"
import _ from "lodash"
import { signedIn } from "../../store/currentUser"
import { supabase } from "../../api/supabase"
import useColorScheme from "../../hooks/useColorScheme"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"

export default function VerifyCodeScreen({
	navigation,
	route,
}: AuthScreenProps<"VerifyCodeScreen">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { phoneNumber } = route.params

	const [code, setCode] = useState("")
	const [loading, setLoading] = useState(false)

	const inputRef = useRef<TextInput>(null)

	const parentNavigator = useNavigation<StackNavigationProp<RootParamList>>()

	const dispatch = useDispatch()

	async function resendCode() {
		setCode("")
		setLoading(true)
		Keyboard.dismiss()
		const { error } = await supabase.auth.signInWithOtp({
			phone: phoneNumber,
		})
		setLoading(false)
		inputRef.current?.focus()
		if (error) {
			console.log({ error })
			return
		}
	}
	async function verifyCode() {
		setLoading(true)
		Keyboard.dismiss()
		const {
			data: { session },
			error,
		} = await supabase.auth.verifyOtp({
			phone: phoneNumber,
			token: code,
			type: "sms",
		})
		setLoading(false)
		if (error || !session) {
			console.log({ error })
			inputRef.current?.focus()
			setCode("")
			return
		}
		LocalStoreService.setKey(LocalStoreKey.userToken, session.access_token)
		dispatch(signedIn({ accessToken: session.access_token, phoneNumber }))
		parentNavigator.push("LoggedInScreen")
		navigation.pop()
	}
	useEffect(() => {
		if (code.length === 6) {
			verifyCode()
		}
	}, [code])

	return (
		<View
			style={{
				width: "100%",
				height: "80%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Input
				ref={inputRef}
				value={code}
				onChangeText={setCode}
				inputContainerStyle={{ display: "none" }}
				autoFocus
			/>
			<View style={style.digitRow}>
				{_.range(6).map((index) => [
					<View style={style.digitWrapper} key={`digit-${index}`}>
						<Text
							style={[
								style.digit,
								!(code.length > index) && { opacity: 0 },
							]}
						>
							{code.length > index ? code[index] : "1"}
						</Text>
					</View>,
					...[
						index < 5 && (
							<View
								style={style.digitSpacer}
								key={`spacer-${index}`}
							/>
						),
					],
				])}
			</View>
			<TouchableOpacity
				onPress={resendCode}
				disabled={loading}
				style={[style.button]}
			>
				{loading ? (
					<ActivityIndicator />
				) : (
					<Text style={style.buttonText}>Resend code</Text>
				)}
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.pop()}
				disabled={loading}
				style={[style.button, loading && { opacity: 0 }]}
			>
				<Text style={style.buttonText}>Change number</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		digitRow: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			width: "80%",
			marginBottom: 50,
		},
		digitWrapper: {
			flex: 1,
			borderWidth: 1,
			borderStyle: "solid",
			borderRadius: 5,
			borderColor: "lightgray",
			padding: 10,
		},
		digit: {
			fontSize: 30,
			color: "gray",
			textAlign: "center",
		},
		digitSpacer: {
			flex: 0.5,
		},
		button: {
			marginTop: 50,
		},
		buttonText: {
			fontSize: 15,
		},
	})
