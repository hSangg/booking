import { defaultStyles } from "@/constants/Style"
import { TouchableOpacity } from "@gorhom/bottom-sheet"
import { Stack, router } from "expo-router"
import React from "react"
import { Text } from "react-native"
import {
	GestureHandlerRootView,
	TextInput,
} from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

const inputEmail = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView
				style={{
					marginVertical: 70,
					marginHorizontal: 20,
				}}
			>
				<Stack.Screen
					options={{
						header: () => <></>,
					}}
				></Stack.Screen>
				<Text
					style={{
						fontFamily: "mon-b",
						fontSize: 20,
						textAlign: "center",
					}}
				>
					Please input your email
				</Text>
				<TextInput
					id='email_finding'
					autoCapitalize='none'
					placeholder='your email'
					style={[
						defaultStyles.inputField,
						{
							marginTop: 20,

							fontFamily: "mon",
							fontSize: 20,
							textAlign: "center",
						},
					]}
				/>

				<TouchableOpacity
					onPress={() => {
						router.push("/(modals)/forgetPassword")
					}}
					style={{ ...defaultStyles.btn, marginTop: 10 }}
				>
					<Text style={defaultStyles.btnText}>
						Continue
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

export default inputEmail
