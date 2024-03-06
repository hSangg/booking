import { View, Text } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

const Index = () => {
	return (
		<View>
			<Text>Index</Text>
			<Link href={"/(modals)/login"}>Login</Link>
			<Link href={"/(modals)/booking"}>Booking</Link>
			<Link href={"/listing/123"}>Listing detail</Link>
		</View>
	)
}

export default Index
