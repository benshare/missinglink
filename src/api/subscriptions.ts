import {
	ActionPayload as PacksActionPayload,
	singleUpdate as singleUpdatePacks,
} from "../store/packs"

import { supabase } from "./supabase"
import { useDispatch } from "react-redux"

export default function useSubscribeToUpdates() {
	const dispatch = useDispatch()

	// Progress
	supabase
		.channel("custom-all-channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "progress" },
			({ eventType, new: newValue }) => {
				switch (eventType) {
					case "INSERT":
					case "UPDATE":
						dispatch(
							singleUpdatePacks(
								newValue as PacksActionPayload["singleUpdate"]
							)
						)
						break
					case "DELETE":
						console.error(
							"Unexpected delete update for table progress"
						)
				}
			}
		)
		.subscribe()
}
