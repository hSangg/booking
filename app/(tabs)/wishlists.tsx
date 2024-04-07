import { View, Text } from "react-native"
import React from "react"
import listingsData from "@/assets/data/airbnb-listings.json"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import WishList from "@/components/WishList"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Homestay } from "@/interface/Homestay"

const Wishlists = () => {
	const listing = (listingsData as Homestay[]).slice(0, 3)
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<Stack.Screen
					options={{
						header: () => <View></View>,
					}}
				></Stack.Screen>

				<WishList listings={listing} />
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

export default Wishlists
