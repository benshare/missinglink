import { FlatList, StyleSheet } from "react-native"

import Header from "../../../components/Header"
import { LoggedInScreenProps } from "../LoggedInScreen"
import PuzzlePreview from "./PuzzlePreview"
import PuzzleScreen from "./puzzle/PuzzleScreen"
import { StackScreenProps } from "@react-navigation/stack"
import Theme from "../../../style/Theme"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import useColorScheme from "../../../hooks/useColorScheme"

export type PackParamList = {
	Pack: { id: string }
	PuzzleScreen: { id: string }
}

const Stack = createNativeStackNavigator<PackParamList>()
export type PackScreenProps<Screen extends keyof PackParamList> =
	StackScreenProps<PackParamList, Screen>

function Pack({ route }: PackScreenProps<"Pack">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { id } = route.params

	const puzzleTitles = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	]
	return (
		<FlatList
			style={style.wrapper}
			ListHeaderComponent={<Header title={id} backIcon />}
			data={puzzleTitles}
			renderItem={({ item: title }) => <PuzzlePreview {...{ title }} />}
			numColumns={2}
			columnWrapperStyle={{
				justifyContent: "space-between",
			}}
			showsVerticalScrollIndicator={false}
		/>
	)
}

export default function PackScreen({
	route,
}: LoggedInScreenProps<"PackScreen">) {
	const { id } = route.params
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
			}}
		>
			<Stack.Screen name="Pack" component={Pack} initialParams={{ id }} />
			<Stack.Screen name="PuzzleScreen" component={PuzzleScreen} />
		</Stack.Navigator>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			padding: 30,
		},
		button: {
			padding: 20,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "gray",
			borderRadius: 30,
		},
		buttonText: {
			fontSize: 20,
		},
	})
