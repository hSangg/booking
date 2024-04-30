import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import {
	GestureHandlerRootView,
	TextInput,
} from "react-native-gesture-handler"
import { defaultStyles } from "@/constants/Style"
import { TouchableOpacity } from "@gorhom/bottom-sheet"

const forgetPassword = () => {
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
					We have sent you your identification code via
					e-mail
				</Text>
				<TextInput
					id='identification_code'
					autoCapitalize='none'
					placeholder='your code'
					keyboardType='numeric'
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

export default forgetPassword
