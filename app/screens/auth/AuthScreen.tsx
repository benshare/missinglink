import {
	NativeStackScreenProps,
	createNativeStackNavigator,
} from "@react-navigation/native-stack"

import PhoneNumberScreen from "./PhoneNumberScreen"
import { StackScreenProps } from "@react-navigation/stack"
import VerifyCodeScreen from "./VerifyCodeScreen"

export type AuthScreenParamList = {
	PhoneNumberScreen: undefined
	VerifyCodeScreen: { phoneNumber: string }
}

const Stack = createNativeStackNavigator<AuthScreenParamList>()
export type AuthScreenProps<Screen extends keyof AuthScreenParamList> =
	StackScreenProps<AuthScreenParamList, Screen>

export default function AuthScreen() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
			}}
		>
			<Stack.Screen
				name="PhoneNumberScreen"
				component={PhoneNumberScreen}
			/>
			<Stack.Screen
				name="VerifyCodeScreen"
				component={VerifyCodeScreen}
			/>
		</Stack.Navigator>
	)
}
