import Streak from "./Streak"
import { selectStreaks } from "../store"
import { useSelector } from "react-redux"

export default function CurrentUserStreak() {
	const streak = useSelector(selectStreaks)

	return <Streak streak={streak} pulse />
}
