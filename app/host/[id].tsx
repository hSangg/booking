import { HostAPI } from "@/api/HostAPI"
import Colors from "@/constants/Colors"
import { Host } from "@/interface/Host"
import { Room } from "@/interface/Room"
import { Ionicons } from "@expo/vector-icons"
import {
	Link,
	Stack,
	router,
	useLocalSearchParams,
	useNavigation,
} from "expo-router"
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { db } from "@/firebase"
import {
	Button,
	Image,
	ListRenderItem,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import {
	FlatList,
	GestureHandlerRootView,
} from "react-native-gesture-handler"
import Animated, {
	FadeIn,
	FadeOut,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { useUserStore } from "@/store/useUserStore"

const DetailPage = () => {
	const navigation = useNavigation()
	const { id } = useLocalSearchParams()
	const { user } = useUserStore()
	const [host, setHost] = useState<Host>()
	useEffect(() => {
		getHostInfor(id as string)
	}, [])
	const getHostInfor = async (id: string) => {
		const res = await HostAPI.getHostInformation(id)
		setHost(res?.data?.data as any)
	}

	const handleOnMessage = async () => {
		const currentTimestamp = new Date() // Get the current time
		const roomChatsRef = collection(db, "roomChats")

		// Query to check if a room chat already exists
		const roomChatQuery = query(
			roomChatsRef,
			where("first", "==", id),
			where("second", "==", user._id)
		)
		const querySnapshot = await getDocs(roomChatQuery)

		let roomID

		if (querySnapshot.empty) {
			// Room chat does not exist, create a new one
			roomID = generateId()
			await setDoc(doc(roomChatsRef, roomID), {
				first: id,
				second: user._id,
				created_At: currentTimestamp,
			})
		} else {
			// Room chat exists, get the existing roomID
			querySnapshot.forEach((doc) => {
				roomID = doc.id // Get the room ID from the existing document
			})
		}

		router.push(`/message/${roomID}`)
	}

	const renderRow: ListRenderItem<Room> = ({ item }) => (
		<Link href={`/listing/${item._id}`} asChild>
			<TouchableOpacity>
				<Animated.View
					style={styles.listingItem}
					entering={FadeIn}
					exiting={FadeOut}
				>
					<Animated.Image
						source={{ uri: item.thumbnail_urls?.[0] || "" }} // Provide an empty string as a fallback if thumbnail_url is null
						style={styles.imageItem}
					/>
					<TouchableOpacity
						style={{
							position: "absolute",
							right: 30,
							top: 30,
						}}
					>
						<Ionicons
							name='heart-outline'
							size={24}
							color='#000'
						/>
					</TouchableOpacity>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text
							style={{ fontSize: 16, fontFamily: "mon-sb" }}
						>
							{item.name}
						</Text>
						<View style={{ flexDirection: "row", gap: 4 }}>
							<Ionicons name='star' size={16} />
						</View>
					</View>

					<Text
						style={{
							fontFamily: "mon",
							textAlign: "center",
						}}
					>
						{item.room_type}
					</Text>
					<View
						style={{
							flexDirection: "row",
							gap: 4,
							justifyContent: "center",
						}}
					>
						<Text style={{ fontFamily: "mon-sb" }}>
							€ {item.price}
						</Text>
						<Text style={{ fontFamily: "mon" }}>night</Text>
					</View>
				</Animated.View>
			</TouchableOpacity>
		</Link>
	)

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					headerTitle: host?.user.name,
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
				}}
			></Stack.Screen>
			<SafeAreaView style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						backgroundColor: "#fff",
					}}
				>
					<Image
						source={{
							uri: "https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/398492825_2334225390300563_2757619712327292917_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHmYr9ejngbLlwuCZGfCHKAr_6mPp2vEOev_qY-na8Q50xDO-KX72UttaZUYEbB0Dx445OAGU5MUiGtLdSOlrLl&_nc_ohc=WXviCk5_sRYQ7kNvgEA2aQn&_nc_ht=scontent.fsgn19-1.fna&oh=00_AYAj_peJeFSCTDqA5GbahdBHH7RxJljR5lhDfJ1jz_FBwg&oe=66546604",
						}}
						style={[styles.image]}
						resizeMode='cover'
					/>
					<View
						style={{
							flexDirection: "column",
							gap: 2,
							justifyContent: "center",
							marginLeft: 10,
						}}
					>
						<View>
							<Text
								style={{
									fontFamily: "mon-b",
									fontSize: 18,
								}}
							>
								{host?.user.name}
							</Text>
						</View>

						<View
							style={{
								backgroundColor: Colors.primary,
								paddingHorizontal: 20,
								paddingVertical: 10,
								marginTop: 10,
								borderRadius: 20,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: 10,
									gap: 5,
								}}
							>
								<Ionicons
									name='navigate-circle-outline'
									size={18}
									color='white'
								/>
								<Text style={{ color: "white" }}>
									{host?.user.phone_number}
								</Text>
							</View>

							<TouchableOpacity
								onPress={handleOnMessage}
								style={{
									backgroundColor: "white",
									paddingVertical: 5,
									paddingHorizontal: 10,
									borderRadius: 20,
									flexDirection: "row",
									alignItems: "center",
									gap: 5,
								}}
							>
								<Ionicons
									name='chatbubble-outline'
									size={18}
								/>
								<Text>Send Message</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<FlatList
					renderItem={renderRow}
					data={host?.hostedList}
					// ref={listRef}
					ListHeaderComponent={
						<Text style={styles.info}>
							{host?.hostedList?.length} homes
						</Text>
					}
				/>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

export default DetailPage

const styles = StyleSheet.create({
	listing: {
		flexDirection: "row",
	},
	listingItem: {
		padding: 16,
		gap: 10,
		marginVertical: 16,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	imageItem: {
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

function generateId(length = 24) {
	const characters = "0123456789abcdef"
	let result = ""
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(
			Math.random() * characters.length
		)
		result += characters[randomIndex]
	}
	return result
}
