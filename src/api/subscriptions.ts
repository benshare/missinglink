import {
	ActionPayload as PacksActionPayload,
	singleUpdate as singleUpdatePacks,
} from "../store/packs"
import { selectPacks, selectWeeks } from "../store"
import { useDispatch, useSelector } from "react-redux"

import { PackStatus } from "../types/puzzle"
import { supabase } from "./supabase"
import { weekComplete } from "../store/weeklyChallenges"

export default function useSubscribeToUpdates() {
	const dispatch = useDispatch()
	const weeks = useSelector(selectWeeks)
	const packs = useSelector(selectPacks)

	// Progress
	supabase
		.channel("custom-all-channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "progress" },
			({ eventType, new: newValue }) => {
				const pack = newValue as PacksActionPayload["singleUpdate"] & {
					title: string
				}
				switch (eventType) {
					case "INSERT":
					case "UPDATE":
						dispatch(singleUpdatePacks(pack))
						if (pack.status === PackStatus.complete) {
							const week = weeks.find(({ packs }) =>
								packs
									.map(({ pack }) => pack)
									.includes(pack.pack_id)
							)!
							const packIds = week.packs.map(({ pack }) => pack)
							const allComplete = packIds.reduce(
								(before, current) =>
									(before &&
										packs[current].status ===
											PackStatus.complete) ||
									current === pack.pack_id,
								true
							)
							if (allComplete) {
								dispatch(weekComplete(week.id))
							}
						}
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
