export function sentenceCase(str: string) {
	if (str.length === 0) {
		return ""
	}
	return `${str[0].toUpperCase()}${str.slice(1)}`
}

export function utcAdjustedLocaleDateString(date: Date) {
	const year = date.getUTCFullYear()
	const month = date.getUTCMonth() + 1
	const day = date.getUTCDate()
	return [month, day, year].join("/")
}

export function dateFromLocaleString(str: string) {
	const [month, day, year] = str.split("/")
	return Date.UTC(parseInt(year), parseInt(month), parseInt(day))
}

export function addDays(date: Date, numDays: number) {
	const newDate = new Date(date.valueOf())
	newDate.setDate(newDate.getDate() + numDays)
	return newDate
}

export function dateDiffInDays(first: Date, second: Date) {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24 + 0.0
	return Math.floor(
		Math.abs(first.getTime() - second.getTime()) / _MS_PER_DAY
	)
}

export function setIntervalLimited(
	effect: (index: number) => void,
	interval: number,
	times: number
) {
	for (let i = 0; i < times; i++) {
		setTimeout(() => effect(i), i * interval)
	}
}

export function delay(milliseconds: number) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
