import Streak from "./Streak"
import { selectCurrentUser } from "../store"
import { useSelector } from "react-redux"

export default function CurrentUserStreak() {
	const streak = useSelector(selectCurrentUser.currentStreak)

	return <Streak streak={streak ?? null} pulse />
}
