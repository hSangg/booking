import {
	View,
	Text,
	StyleSheet,
	ListRenderItem,
	TouchableOpacity,
} from "react-native"
import { defaultStyles } from "@/constants/Style"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"
import { useEffect, useRef, useState } from "react"
import {
	BottomSheetFlatList,
	BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet"
import { FlatList } from "react-native"
import { Homestay } from "@/interface/Homestay"

interface Props {
	listings: any[]
}

const Listings = ({ listings: items }: Props) => {
	const listRef = useRef<BottomSheetFlatListMethods>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const renderRow: ListRenderItem<any> = ({ item }) => (
		<Link href={`/listing/${item.id}`} asChild>
			<TouchableOpacity>
				<Animated.View
					style={styles.listing}
					entering={FadeInRight}
					exiting={FadeOutLeft}
				>
					<Animated.Image
						source={{ uri: item.medium_url }}
						style={styles.image}
					/>

					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<Text
							style={{
								fontSize: 16,
								fontFamily: "mon-sb",
								textAlign: "center",
								width: "75%",
							}}
						>
							{item.name}
						</Text>
					</View>
					<View>
						<Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>
						<View style={{ flexDirection: "row", gap: 4 }}>
							<Text style={{ fontFamily: "mon-sb" }}>€ {item.price}</Text>
							<Text style={{ fontFamily: "mon" }}>night</Text>
						</View>
					</View>

					<View
						style={{
							width: "auto",

							borderColor: "#cccccc",
							borderWidth: 1,
							borderRadius: 20,
							paddingHorizontal: 30,

							paddingVertical: 10,
						}}
					>
						<Text style={{ fontFamily: "mon" }}>{item.summary}</Text>
					</View>
				</Animated.View>
			</TouchableOpacity>
		</Link>
	)

	return (
		<View style={defaultStyles.container}>
			<Text style={{ fontFamily: "mon-b", fontSize: 20, textAlign: "center" }}>
				WishList
			</Text>
			<FlatList
				renderItem={renderRow}
				data={loading ? [] : items}
				// ref={listRef}
				ListHeaderComponent={
					<Text style={styles.info}>{items.length} homes</Text>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	listing: {
		padding: 16,
		gap: 10,
		flexDirection: "column",

		alignItems: "center",
		marginVertical: 16,
	},
	image: {
		width: 350,
		height: 350,
		borderRadius: 10,
	},
	info: {
		textAlign: "center",
		fontFamily: "mon-sb",
		fontSize: 16,
		marginTop: 4,
	},
})

export default Listings
