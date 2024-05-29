import { useFonts } from "expo-font"
import { Slot, Stack, useRouter } from "expo-router"
import { useCallback, useEffect, useState } from "react"

import { useColorScheme } from "@/components/useColorScheme"
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
import { Ionicons } from "@expo/vector-icons"
import * as SecureStore from "expo-secure-store"
import { TouchableOpacity } from "react-native"
import ModalHeader from "@/components/ModalHeader"
import AppLoading from "expo-app-loading"
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import {
	getValueSecureStore,
	saveValueSecureStore,
} from "@/store/SecureStore"
import { UserAPI } from "@/api/UserAPI"
import { User, useUserStore } from "@/store/useUserStore"

SplashScreen.preventAutoHideAsync()

const CLERK_PUBLISHABLE_KEY =
	process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key)
		} catch (err) {
			return null
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value)
		} catch (err) {
			return
		}
	},
}

SplashScreen.hideAsync()

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
	initialRouteName: "(tabs)",
}

export default function RootLayout() {
	const [appIsReady, setAppIsReady] = useState(false)

	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				await Font.loadAsync({
					mon: require("@/assets/fonts/Montserrat-Regular.ttf"),
					"mon-sb": require("@/assets/fonts/Montserrat-SemiBold.ttf"),
					"mon-b": require("@/assets/fonts/Montserrat-Bold.ttf"),
					"mon-t": require("@/assets/fonts/Montserrat-Thin.ttf"),
				})
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				await new Promise((resolve) =>
					setTimeout(resolve, 2000)
				)
			} catch (e) {
				console.warn(e)
			} finally {
				// Tell the application to render
				setAppIsReady(true)
			}
		}

		prepare()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])

	if (!appIsReady) {
		return null
	}

	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY!}
			tokenCache={tokenCache}
		>
			<RootLayoutNav />
		</ClerkProvider>
	)
}

function RootLayoutNav() {
	const colorScheme = useColorScheme()
	const router = useRouter()

	// const { isLoaded, isSignedIn } = useAuth()
	// useEffect(() => {
	// 	if (isLoaded && !isSignedIn)
	// 		router.push("/(modals)/login")
	// }, [isLoaded])

	const updateUser = useUserStore(
		(state) => state.updateUser
	)

	const login = async (email: string, password: string) => {
		try {
			const res = await UserAPI.login(email, password)
			if (res?.status === 200) {
				const {
					_id,
					name,
					email,
					phone_number,
					created_at,
				} = res?.data?.data
				const user: User = {
					_id,
					token: res.data.token,
					username: name,
					email,
					phoneNumber: phone_number,
					isLogin: true,
					created_at,
				}
				updateUser(user)
				router.push("/(tabs)/profile")
			}
		} catch (error) {
			console.log(error)
		}
	}

	const checkLogedState = async () => {
		const email = await getValueSecureStore("email")
		const password = await getValueSecureStore("password")
		if (email && !password) {
			console.log("loginWithoutEmailField")
			router.push("/(modals)/loginWithoutEmailField")
		} else if (email && password) {
			login(email, password)
		} else {
			router.push("/(modals)/login")
		}
	}

	useEffect(() => {
		checkLogedState()
	}, [])

	return (
		<Stack>
			<Stack.Screen
				name='(tabs)'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='(modals)/login'
				options={{
					title: "Login or sign up",

					headerTitleStyle: {
						fontFamily: "mon-sb",
					},
					presentation: "modal",
					headerLeft: () => {
						return (
							<TouchableOpacity
								onPress={() => {
									router.back()
								}}
							>
								<Ionicons name='close-outline' size={28} />
							</TouchableOpacity>
						)
					},
				}}
			/>

			<Stack.Screen
				name='(modals)/signup'
				options={{
					title: "Sign up",

					headerTitleStyle: {
						fontFamily: "mon-sb",
					},
					presentation: "modal",
					headerLeft: () => {
						return (
							<TouchableOpacity
								onPress={() => {
									router.back()
								}}
							>
								<Ionicons name='close-outline' size={28} />
							</TouchableOpacity>
						)
					},
				}}
			/>

			<Stack.Screen
				name='listing/[id]'
				options={{ headerTitle: "" }}
			/>
			<Stack.Screen
				name='(modals)/booking'
				options={{
					presentation: "transparentModal",
					animation: "fade",
					headerTransparent: true,
					headerTitle: () => <ModalHeader />,
					// headerLeft: () => {
					// 	return (
					// 		<TouchableOpacity
					// 			onPress={() => {
					// 				router.back()
					// 			}}
					// 		>
					// 			<Ionicons name='close-outline' size={28} />
					// 		</TouchableOpacity>
					// 	)
					// },
				}}
			/>
		</Stack>
	)
}
