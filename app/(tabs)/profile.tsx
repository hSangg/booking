import {
	View,
	Text,
	Button,
	StyleSheet,
	Image,
} from "react-native"
import React, { useState } from "react"
import { useAuth } from "@clerk/clerk-expo"
import { Link, Stack, router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { defaultStyles } from "@/constants/Style"
import { Ionicons } from "@expo/vector-icons"
import {
	GestureHandlerRootView,
	TextInput,
	TouchableOpacity,
} from "react-native-gesture-handler"
import Colors from "@/constants/Colors"
import { useUserStore } from "@/store/useUserStore"
import { deleteValueSecureStore } from "@/store/SecureStore"

const profile = () => {
	const [edit, setEdit] = useState(false)

	const user = useUserStore((state) => state.user)

	const handleLogout = async () => {
		deleteValueSecureStore("email")
		router.push("/(modals)/login")
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					header: () => <View></View>,
				}}
			></Stack.Screen>

			<SafeAreaView style={defaultStyles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>
						Profile {user.username}
					</Text>
					<Ionicons
						name='notifications-outline'
						size={26}
					/>
				</View>

				<View style={styles.card}>
					<TouchableOpacity>
						<Image
							source={{
								uri: "https://avatars.githubusercontent.com/u/92299727?s=96&v=4",
							}}
							style={styles.avatar}
						/>
					</TouchableOpacity>
					<View style={{ flexDirection: "row", gap: 6 }}>
						{!edit && (
							<View style={styles.editRow}>
								<Text
									style={{
										fontFamily: "mon-b",
										fontSize: 22,
									}}
								>
									{user.username}
								</Text>
								<TouchableOpacity
									onPress={() => setEdit(true)}
								>
									<Ionicons
										name='create-outline'
										size={24}
										color={Colors.dark}
									/>
								</TouchableOpacity>
							</View>
						)}
					</View>
					<Text>{user.email}</Text>
					<Text>Since {"16/05/2003"}</Text>
				</View>

				{user.isLogin && (
					<Button
						title='Log Out'
						onPress={handleLogout}
						color={Colors.dark}
					/>
				)}
				{!user.isLogin && (
					<Link href={"/(modals)/login"} asChild>
						<Button title='Log In' color={Colors.dark} />
					</Link>
				)}
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 24,
	},
	header: {
		fontFamily: "mon-b",
		fontSize: 24,
	},
	card: {
		backgroundColor: "#fff",
		padding: 24,
		borderRadius: 16,
		marginHorizontal: 24,
		marginTop: 24,
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		alignItems: "center",
		gap: 14,
		marginBottom: 24,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: Colors.grey,
	},
	editRow: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
})

export default profile
