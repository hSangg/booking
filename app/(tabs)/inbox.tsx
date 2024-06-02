import { defaultStyles } from "@/constants/Style"
import {
	collection,
	doc,
	getDoc,
	getDocs,
	or,
	query,
	setDoc,
	where,
} from "firebase/firestore"
import { Ionicons } from "@expo/vector-icons"
import { db } from "@/firebase"

import { Link } from "expo-router"
import {
	FlatList,
	StyleSheet,
	ListRenderItem,
	Text,
	TouchableOpacity,
	View,
	Button,
} from "react-native"
import Animated, {
	FadeInRight,
	FadeOutLeft,
} from "react-native-reanimated"
import { useUserStore } from "@/store/useUserStore"
import { useState } from "react"

const removeDuplicates = (array: any) => {
	return [...new Set(array)]
}

const Inbox = () => {
	const { user } = useUserStore()
	const [roomIDList, setRoomIDList] = useState<any>([])
	const renderRow: ListRenderItem<any> = ({ item }) => (
		<Link href={`/message/${item}`} asChild>
			<TouchableOpacity>
				<Animated.View
					style={styles.listing}
					entering={FadeInRight}
					exiting={FadeOutLeft}
				>
					<View
						style={{
							backgroundColor: "red",
							width: 50,
							height: 50,
							borderRadius: 10,
						}}
					></View>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "flex-start",
						}}
					>
						<Text
							style={{
								fontFamily: "mon-sb",
								fontSize: 16,
							}}
						>
							{item.destinationUser}
						</Text>
						<Text
							style={{
								color: "#888888",
								fontFamily: "mon",
							}}
						>
							{item.lastingMessage}
						</Text>
					</View>
				</Animated.View>
			</TouchableOpacity>
		</Link>
	)

	const getData = async () => {
		const userID = user._id

		try {
			const q = query(
				collection(db, "roomChats"),
				or(
					where("first", "==", userID),
					where("second", "==", userID)
				)
			)
			const list: any = []
			const querySnapshot = await getDocs(q)
			querySnapshot.docs.forEach((doc) => {
				list.push(doc.id)
			})

			const uniqueArray = removeDuplicates(list)
			setRoomIDList(uniqueArray)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={defaultStyles.container}>
			<Button title='Test' onPress={getData}></Button>
			<FlatList
				renderItem={renderRow}
				data={roomIDList}
				// ref={listRef}
				ListHeaderComponent={
					<Text style={styles.info}>
						{roomIDList.length} homes
					</Text>
				}
			/>
		</View>
	)
}
export default Inbox

const styles = StyleSheet.create({
	listing: {
		backgroundColor: "#ccc",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		padding: 10,
		marginHorizontal: 15,
		marginVertical: 5,
		borderRadius: 10,
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
})
