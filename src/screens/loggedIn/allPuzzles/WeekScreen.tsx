import { FlatList, StyleSheet } from "react-native"

import { AllPuzzlesScreenProps } from "./AllPuzzlesScreen"
import CurrentUserStreak from "../../../components/CurrentUserStreak"
import Header from "../../../components/Header"
import { LoggedInScreenParamList } from "../LoggedInScreen"
import PackPreview from "../today/PackPreview"
import PackScreen from "../today/pack/PackScreen"
import { StackScreenProps } from "@react-navigation/stack"
import Theme from "../../../style/Theme"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { selectWeek } from "../../../store"
import useColorScheme from "../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export type WeekParamList = {
	Week: { id: number }
} & Pick<LoggedInScreenParamList, "PackScreen">

const Stack = createNativeStackNavigator<WeekParamList>()
export type WeekScreenProps<Screen extends keyof WeekParamList> =
	StackScreenProps<WeekParamList, Screen>

function Week({ route }: WeekScreenProps<"Week">) {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const { id } = route.params
	const { title, packs } = useSelector(selectWeek(id))

	return (
		<FlatList
			style={style.wrapper}
			ListHeaderComponent={
				<Header
					title={title}
					backIcon
					RightElement={CurrentUserStreak}
				/>
			}
			data={packs}
			renderItem={({ item: { day, pack } }) => (
				<PackPreview {...{ day, id: pack }} />
			)}
			numColumns={2}
			columnWrapperStyle={{
				justifyContent: "space-between",
			}}
			showsVerticalScrollIndicator={false}
		/>
	)
}

export default function WeekScreen({
	route,
}: AllPuzzlesScreenProps<"WeekScreen">) {
	const { id } = route.params
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
			}}
		>
			<Stack.Screen name="Week" component={Week} initialParams={{ id }} />
			<Stack.Screen name="PackScreen" component={PackScreen} />
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
