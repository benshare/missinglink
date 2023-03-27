import { randomUUID } from "crypto"

export function randomString() {
	return randomUUID()
}

export function delay(milliseconds: number) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export function batchValues<T>(list: T[], batchSize: number) {
	const batches: T[][] = []
	for (let batch = 0; batch < Math.ceil(list.length / batchSize); batch++) {
		batches.push(list.slice(batch * batchSize, (batch + 1) * batchSize))
	}
	return batches
}

export function doubleQuotes(original: string) {
	const split = original.split("'")
	return split.join("''")
}

export function isVersionSufficient(version: string, required: string) {
	const versionSplit = version.split(".")
	const requiredSplit = required.split(".")
	for (let i = 0; i < versionSplit.length; i++) {
		if (parseInt(versionSplit[i]) < parseInt(requiredSplit[i])) {
			return false
		}
	}
	return true
}

export function isCommonElement<T>(list1: T[], list2: T[]) {
	return list1.some((element) => list2.includes(element))
}

export function extractMentions(text: string) {
	const mentions = text.match(/@\[(\S+)\]\(([a-z\d-]+)\)/g) ?? []
	return mentions.map(
		(mention: string) => mention.match(/@\[(\S+)\]\(([a-z\d-]+)\)/)[2]
	)
}
