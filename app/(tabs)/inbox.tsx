import { defaultStyles } from "@/constants/Style"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import {
	FlatList,
	StyleSheet,
	ListRenderItem,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import Animated, {
	FadeInRight,
	FadeOutLeft,
} from "react-native-reanimated"

const Inbox = () => {
	const renderRow: ListRenderItem<any> = ({ item }) => (
		<Link href={`/message/${item.room}`} asChild>
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
	return (
		<View style={defaultStyles.container}>
			<FlatList
				renderItem={renderRow}
				data={items}
				// ref={listRef}
				ListHeaderComponent={
					<Text style={styles.info}>
						{items.length} homes
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

const items = [
	{
		destinationUser: "Alex",
		lastingMessage: "Hello welcome to VN 😍",
		room: "a",
	},
	{
		destinationUser: "John Nguyen",
		lastingMessage: "The price for one night is $20 🔥",
		room: "b",
	},
	{
		destinationUser: "John VN",
		lastingMessage: "Wish you have amazing trips here",
		room: "c",
	},
]
