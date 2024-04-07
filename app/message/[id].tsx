import Colors from "@/constants/Colors"
import { defaultStyles } from "@/constants/Style"
import { Ionicons } from "@expo/vector-icons"
import {
	Link,
	Stack,
	useLocalSearchParams,
	useNavigation,
} from "expo-router"
import React, { useLayoutEffect } from "react"
import {
	ListRenderItem,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import {
	FlatList,
	GestureHandlerRootView,
	TextInput,
} from "react-native-gesture-handler"
import Animated, {
	FadeInRight,
	FadeOutLeft,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

const DetailPage = () => {
	const navigation = useNavigation() // Access navigation object
	const userID = "12121212" // current user

	const hostID = "aefaefaef" // destination user
	const hostName = "John Nguyen"
	const { id: roomID } = useLocalSearchParams()

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "JOHN NGUYEN",
			headerTransparent: false,

			headerLeft: () => (
				<TouchableOpacity
					style={styles.roundButton}
					onPress={() => navigation.goBack()}
				>
					<Ionicons
						name='chevron-back'
						size={24}
						color={"#000"}
					/>
				</TouchableOpacity>
			),
		})
	}, [])

	// fetch data from firebase

	// roomID is identification of the current room
	// userID is the current user see the chatbox (Render text in the right side)

	const renderRow: ListRenderItem<any> = ({ item }) => (
		<Animated.View
			style={styles.listing}
			entering={FadeInRight}
			exiting={FadeOutLeft}
		>
			<View
				style={{
					alignItems:
						item.userId === userID
							? "flex-end"
							: "flex-start",

					marginHorizontal: 15,
					marginVertical: 5,
					flex: 1,
				}}
			>
				<View
					style={{
						backgroundColor: Colors.primary,
						paddingHorizontal: 25,
						paddingVertical: 10,
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Text
						style={{
							color: "white",

							fontFamily: "mon",
							maxWidth: "70%",
						}}
					>
						{item.message}
					</Text>
				</View>
				<Text
					style={{
						fontFamily: "mon",
						fontSize: 12,
						marginTop: 5,
						opacity: 0.4,
						marginLeft: 6,
					}}
				>
					{item.sentTime}
				</Text>
			</View>
		</Animated.View>
	)

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<FlatList
					renderItem={renderRow}
					data={sampleData}
					// ref={listRef}
				/>
			</SafeAreaView>
			<View
				style={{
					position: "absolute",

					padding: 10,
					bottom: 0,
					left: 0,
					right: 0,
					flexDirection: "row", // Add flexDirection: "row"
					alignItems: "center", // Add alignItems: "center"
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<TextInput
						secureTextEntry
						autoCapitalize='none'
						placeholder='password'
						style={[
							defaultStyles.inputField,
							{
								flex: 1,

								height: "auto",
								marginRight: 10,
							},
						]}
					/>

					<TouchableOpacity
						style={styles.roundButton}
						onPress={() => navigation.goBack()}
					>
						<Ionicons
							name='chatbubble-outline'
							size={24}
							color={"#000"}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	listing: {
		flexDirection: "row",
	},
	image: {
		width: "100%",
		height: 300,
		borderRadius: 10,
	},
	info: {
		textAlign: "center",
		fontFamily: "mon-sb",
		fontSize: 16,
		marginTop: 4,
	},
	roundButton: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		color: Colors.primary,
	},
})

export default DetailPage

const sampleData = [
	{
		userId: "12121212",
		message: "Hello",
		room: "a",
		timestamp: Date.now() - 300000, // 5 minutes ago (300000 milliseconds)
		sentTime: calculateTimeDifference(Date.now() - 300000),
	},
	{
		userId: "destinationUser",
		message: "Hello",
		room: "a",
		timestamp: Date.now() - 240000, // 4 minutes ago
		sentTime: calculateTimeDifference(Date.now() - 240000),
	},
	{
		userId: "12121212",
		message: "What do you want?",
		room: "a",
		timestamp: Date.now() - 180000, // 3 minutes ago
		sentTime: calculateTimeDifference(Date.now() - 180000),
	},
	{
		userId: "destinationUser",
		message:
			"I want to make a reservation for my trip in HCM city",
		room: "a",
		timestamp: Date.now() - 120000, // 2 minutes ago
		sentTime: calculateTimeDifference(Date.now() - 120000),
	},
	// Add more messages with timestamps as needed
]

// Function to calculate the time difference between two timestamps in minutes
function calculateTimeDifference(
	timestamp: number
): string {
	const currentTime = Date.now()
	const difference = Math.floor(
		(currentTime - timestamp) / 1000
	) // Convert milliseconds to seconds

	if (difference < 60) {
		return "Just now"
	} else if (difference < 3600) {
		// Less than an hour
		const minutes = Math.floor(difference / 60)
		return `${minutes} ${
			minutes === 1 ? "minute" : "minutes"
		} ago`
	} else if (difference < 86400) {
		// Less than a day
		const hours = Math.floor(difference / 3600)
		return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
	} else {
		// More than a day
		const days = Math.floor(difference / 86400)
		return `${days} ${days === 1 ? "day" : "days"} ago`
	}
}
