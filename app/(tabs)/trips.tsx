import { View, Text, ListRenderItem } from "react-native"
import React from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Stack } from "expo-router"
import CommingTrip from "@/components/CommingTrip"
import trips from "@/assets/data/reservations.json"
import { SafeAreaView } from "react-native-safe-area-context"
const Trips = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<Stack.Screen
					options={{
						header: () => <View></View>,
					}}
				></Stack.Screen>

				<CommingTrip trips={trips} />
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

export default Trips
