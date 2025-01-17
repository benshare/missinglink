import {
	ActionPayload as CurrentUserActionPayload,
	profileLoaded,
} from "../store/currentUser"
import {
	ActionPayload as LeaderboardActionPayload,
	userUpdated,
} from "../store/leaderboard"
import {
	ActionPayload as PacksActionPayload,
	singleUpdate as singleUpdatePacks,
} from "../store/packs"
import {
	ActionPayload as WeeklyActionPayload,
	weekComplete,
} from "../store/weeklyChallenges"

import { supabase } from "./supabase"
import { useDispatch } from "react-redux"

export default function useSubscribeToUpdates() {
	const dispatch = useDispatch()

	supabase
		.channel("pack_updates_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "pack_progress" },
			({ eventType, new: newValue }) => {
				const pack = newValue as PacksActionPayload["singleUpdate"] & {
					title: string
				}
				switch (eventType) {
					case "INSERT":
					case "UPDATE":
						dispatch(singleUpdatePacks(pack))
						break
					case "DELETE":
						console.error(
							"Unexpected delete for table pack_progress"
						)
				}
			}
		)
		.subscribe()

	supabase
		.channel("week_updates_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "week_progress" },
			({ eventType, new: newValue }) => {
				const { week_id, on_time } =
					newValue as WeeklyActionPayload["weekComplete"]
				switch (eventType) {
					case "INSERT":
						dispatch(weekComplete({ week_id, on_time }))
						break
					case "UPDATE":
					case "DELETE":
						console.error(
							"Unexpected update or delete for table week_progress"
						)
				}
			}
		)
		.subscribe()

	supabase
		.channel("profile_updates_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "profiles" },
			({ eventType, new: newValue }) => {
				const profile =
					newValue as CurrentUserActionPayload["profileLoaded"] &
						LeaderboardActionPayload["userUpdated"]
				switch (eventType) {
					case "UPDATE":
						dispatch(profileLoaded(profile))
						dispatch(userUpdated(profile))
						break
					case "INSERT":
					case "DELETE":
						console.error(
							"Unexpected insert or delete for table profiles"
						)
				}
			}
		)
		.subscribe()
}
