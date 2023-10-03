export function sentenceCase(str: string) {
	if (str.length === 0) {
		return ""
	}
	return `${str[0].toUpperCase()}${str.slice(1)}`
}

export function dateFromLocaleString(str: string) {
	const [month, day, year] = str.split("/")
	return new Date([year, month, day].join("-"))
}

export function addDays(date: Date, numDays: number) {
	const newDate = new Date(date.valueOf())
	newDate.setDate(newDate.getDate() + numDays)
	return newDate
}

export function dateDiffInDays(first: Date, second: Date) {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24

	const utc1 = Date.UTC(
		first.getFullYear(),
		first.getMonth(),
		first.getDate()
	)
	const utc2 = Date.UTC(
		second.getFullYear(),
		second.getMonth(),
		second.getDate()
	)

	return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY))
}
