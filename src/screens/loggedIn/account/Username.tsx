import { ReactNode, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text, TextInput, TouchableOpacity } from "react-native"

import Theme from "../../../style/Theme"
import Updates from "../../../api/updates"
import { selectCurrentUser } from "../../../store"
import useColorScheme from "../../../hooks/useColorScheme"
import { useSelector } from "react-redux"

export default function Username() {
	const theme = useColorScheme()
	const style = styles(Theme[theme])

	const username = useSelector(selectCurrentUser.username)

	const [newUsername, setNewUsername] = useState(username ?? "")
	const [editing, setEditing] = useState(false)

	// TODO: add a check for non-existent username
	const validToSave = newUsername.length >= 3 && newUsername !== username

	const onSave = () => {
		setEditing(false)
		Updates.setUsername(newUsername)
	}
	const onCancel = () => {
		setEditing(false)
		setNewUsername(username ?? "")
	}

	if (username === undefined) {
		var RightItem: ReactNode = undefined
	} else if (editing) {
		RightItem = (
			<View>
				<TextInput
					value={newUsername}
					onChangeText={setNewUsername}
					style={style.input}
					autoFocus
				/>
				<View style={style.buttonRow}>
					<TouchableOpacity
						onPress={onSave}
						disabled={!validToSave}
						style={!validToSave && { opacity: 0.3 }}
						hitSlop={10}
					>
						<Text style={style.buttonText}>Save</Text>
					</TouchableOpacity>
					<TouchableOpacity hitSlop={10}>
						<Text style={style.buttonText} onPress={onCancel}>
							Cancel
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	} else if (username === null) {
		RightItem = (
			<TouchableOpacity onPress={() => setEditing(true)}>
				<Text style={style.text}>Set</Text>
			</TouchableOpacity>
		)
	} else {
		RightItem = (
			<TouchableOpacity onPress={() => setEditing(true)}>
				<Text style={style.text}>{username}</Text>
			</TouchableOpacity>
		)
	}

	return RightItem
}

const styles = (theme: typeof Theme.light & typeof Theme.dark) =>
	StyleSheet.create({
		text: {
			fontSize: 20,
			color: theme.colors.primary.main,
		},
		input: {
			backgroundColor: theme.colors.primary.light,
			minWidth: 120,
			borderRadius: 10,
			padding: 10,
			textAlign: "center",
			fontSize: 15,
		},
		buttonRow: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: 10,
			paddingHorizontal: 10,
		},
		buttonText: {
			color: theme.colors.primary.main,
			fontSize: 15,
		},
	})
