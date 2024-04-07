import { View, Text, Button, StyleSheet, Image } from "react-native"
import React, { useState } from "react"
import { useAuth } from "@clerk/clerk-expo"
import { Link, Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { defaultStyles } from "@/constants/Style"
import { Ionicons } from "@expo/vector-icons"
import {
	GestureHandlerRootView,
	TextInput,
	TouchableOpacity,
} from "react-native-gesture-handler"
import Colors from "@/constants/Colors"

const profile = () => {
	const { signOut, isSignedIn } = useAuth()
	const [edit, setEdit] = useState(false)

	const [firstName, setFirstName] = useState("Cao")
	const [lastName, setLastName] = useState("Cao")
	const [user, setUser] = useState({
		imageUrl: "https://avatars.githubusercontent.com/u/92299727?s=96&v=4",
		createdAt: "12-12-2003",
	})

	const email = "hoai.sang050@gmail.com"

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					header: () => <View></View>,
				}}
			></Stack.Screen>

			<SafeAreaView style={defaultStyles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>Profile</Text>
					<Ionicons name='notifications-outline' size={26} />
				</View>

				<View style={styles.card}>
					<TouchableOpacity>
						<Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
					</TouchableOpacity>
					<View style={{ flexDirection: "row", gap: 6 }}>
						{!edit && (
							<View style={styles.editRow}>
								<Text style={{ fontFamily: "mon-b", fontSize: 22 }}>
									{firstName} {lastName}
								</Text>
								<TouchableOpacity onPress={() => setEdit(true)}>
									<Ionicons
										name='create-outline'
										size={24}
										color={Colors.dark}
									/>
								</TouchableOpacity>
							</View>
						)}
						{edit && (
							<View style={styles.editRow}>
								<TextInput
									placeholder='First Name'
									value={firstName || ""}
									onChangeText={setFirstName}
									style={[defaultStyles.inputField, { width: 100 }]}
								/>
								<TextInput
									placeholder='Last Name'
									value={lastName || ""}
									onChangeText={setLastName}
									style={[defaultStyles.inputField, { width: 100 }]}
								/>
								<TouchableOpacity>
									<Ionicons
										name='checkmark-outline'
										size={24}
										color={Colors.dark}
									/>
								</TouchableOpacity>
							</View>
						)}
					</View>
					<Text>{email}</Text>
					<Text>Since {user?.createdAt}</Text>
				</View>

				{isSignedIn && (
					<Button
						title='Log Out'
						onPress={() => signOut()}
						color={Colors.dark}
					/>
				)}
				{!isSignedIn && (
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
