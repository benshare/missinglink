import * as SplashScreen from "expo-splash-screen"

import { QueryClient, QueryClientProvider } from "react-query"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Navigation from "./navigation"
import { PortalProvider } from "@gorhom/portal"
import { Provider } from "react-redux"
import { RecoilRoot } from "recoil"
import { StatusBar } from "expo-status-bar"
import { store } from "./store"

export const queryClient = new QueryClient()

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
})

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<PortalProvider>
								<BottomSheetModalProvider>
									<Navigation />
								</BottomSheetModalProvider>
							</PortalProvider>
						</GestureHandlerRootView>
						<StatusBar />
					</QueryClientProvider>
				</Provider>
			</RecoilRoot>
		</QueryClientProvider>
	)
}
