import { StyleSheet } from "react-native"
import Theme from "./Theme"

const globalStyles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({})

export default globalStyles
