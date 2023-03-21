import * as SecureStore from "expo-secure-store"

import AsyncStorage from "@react-native-async-storage/async-storage"

export enum LocalStoreKey {
	userToken = "userToken",
}
const IS_SECURE: { [key in LocalStoreKey]: boolean } = {
	[LocalStoreKey.userToken]: true,
}
export class LocalStoreService {
	static async getKey<T = string>(key: LocalStoreKey) {
		const fn = IS_SECURE[key]
			? SecureStore.getItemAsync
			: AsyncStorage.getItem
		const unparsed = await fn(key)

		if (!unparsed) {
			return null
		}
		return JSON.parse(unparsed) as T
	}

	static async setKey(key: LocalStoreKey, value: any) {
		const fn = IS_SECURE[key]
			? SecureStore.setItemAsync
			: AsyncStorage.setItem
		await fn(key, JSON.stringify(value))
	}

	static async clearKey(key: LocalStoreKey) {
		const fn = IS_SECURE[key]
			? SecureStore.deleteItemAsync
			: AsyncStorage.removeItem
		await fn(key)
	}
}
