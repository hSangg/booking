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
import Animated, {
	FadeInRight,
	FadeOutLeft,
} from "react-native-reanimated"
import { useEffect, useRef, useState } from "react"
import {
	BottomSheetFlatList,
	BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet"
import { FlatList } from "react-native"
import { Room } from "@/interface/Room"

interface Props {
	listings: any[]
	// refresh: number
	category: string
}

const Listings = ({ listings: items, category }: Props) => {
	const listRef = useRef<BottomSheetFlatListMethods>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const scrollListTop = () => {
		listRef.current?.scrollToOffset({
			offset: 0,
			animated: true,
		})
	}

	useEffect(() => {
		setLoading(true)

		setTimeout(() => {
			setLoading(false)
		}, 200)
	}, [category])

	const renderRow: ListRenderItem<Room> = ({ item }) => (
		<Link href={`/listing/${item._id}`} asChild>
			<TouchableOpacity>
				<Animated.View
					style={styles.listing}
					entering={FadeInRight}
					exiting={FadeOutLeft}
				>
					<Animated.Image
						source={{
							uri:
								item.thumbnail_urls?.[0] ||
								"https://random.imagecdn.app/500/500",
						}} // Provide an empty string as a fallback if thumbnail_url is null
						style={styles.image}
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
					<Text style={{ fontFamily: "mon" }}>
						{item.room_type}
					</Text>
					<View style={{ flexDirection: "row", gap: 4 }}>
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
		<View style={defaultStyles.container}>
			<FlatList
				renderItem={renderRow}
				data={loading ? [] : items}
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

const styles = StyleSheet.create({
	listing: {
		padding: 16,
		gap: 10,
		marginVertical: 16,
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

export default Listings
