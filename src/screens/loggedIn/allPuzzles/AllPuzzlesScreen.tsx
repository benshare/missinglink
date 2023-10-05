import { FlatList, StyleSheet } from "react-native"

import CurrentUserStreak from "../../../components/CurrentUserStreak"
import Header from "../../../components/Header"
import { StackScreenProps } from "@react-navigation/stack"
import Theme from "../../../style/Theme"
import WeekPreview from "./WeekPreview"
import WeekScreen from "./WeekScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { selectWeeks } from "../../../store"
import useColorScheme from "../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export type AllPuzzlesParamList = {
	AllPuzzles: undefined
	WeekScreen: { id: number }
}
const Stack = createNativeStackNavigator<AllPuzzlesParamList>()
export type AllPuzzlesScreenProps<Screen extends keyof AllPuzzlesParamList> =
	StackScreenProps<AllPuzzlesParamList, Screen>

function AllPuzzles() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const weeks = useSelector(selectWeeks)
	return (
		<FlatList
			style={style.wrapper}
			ListHeaderComponent={
				<Header
					title="All puzzles"
					backIcon
					RightElement={CurrentUserStreak}
				/>
			}
			data={weeks}
			renderItem={({ item: week }) => <WeekPreview {...week} />}
			numColumns={2}
			columnWrapperStyle={{
				justifyContent: "space-between",
			}}
			showsVerticalScrollIndicator={false}
		/>
	)
}

export default function AllPuzzlesScreen() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
			}}
		>
			<Stack.Screen name="AllPuzzles" component={AllPuzzles} />
			<Stack.Screen name="WeekScreen" component={WeekScreen} />
		</Stack.Navigator>
	)
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		wrapper: {
			padding: 30,
		},
	})
