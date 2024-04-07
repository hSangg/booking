import {
	router,
	useLocalSearchParams,
	useNavigation,
} from "expo-router"
import React, { useLayoutEffect } from "react"
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Share,
} from "react-native"
import listingsData from "@/assets/data/airbnb-listings.json"
import { Ionicons } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import Animated, {
	SlideInDown,
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from "react-native-reanimated"
import { defaultStyles } from "@/constants/Style"
import { Homestay } from "@/interface/Homestay"

const { width } = Dimensions.get("window")
const IMG_HEIGHT = 340

const DetailsPage = () => {
	const { id } = useLocalSearchParams()
	const listing = (listingsData as Homestay[]).find(
		(item) => item.id === id
	)
	const navigation = useNavigation()
	const scrollRef = useAnimatedRef<Animated.ScrollView>()

	const shareListing = async () => {
		try {
			await Share.share({
				title: listing?.name || "",
				url: listing?.listing_url || "",
			})
		} catch (err) {
			console.log(err)
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerTransparent: true,

			headerBackground: () => (
				<Animated.View
					style={[headerAnimatedStyle, styles.header]}
				></Animated.View>
			),
			headerRight: () => (
				<View style={styles.bar}>
					<TouchableOpacity
						style={styles.roundButton}
						onPress={shareListing}
					>
						<Ionicons
							name='share-outline'
							size={22}
							color={"#000"}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.roundButton}>
						<Ionicons
							name='heart-outline'
							size={22}
							color={"#000"}
						/>
					</TouchableOpacity>
				</View>
			),
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
		})
	}, [])

	const scrollOffset = useScrollViewOffset(scrollRef)

	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
						[-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		}
	})

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollOffset.value,
				[0, IMG_HEIGHT / 1.5],
				[0, 1]
			),
		}
	}, [])

	return (
		<View style={styles.container}>
			<Animated.ScrollView
				contentContainerStyle={{ paddingBottom: 100 }}
				ref={scrollRef}
				scrollEventThrottle={16}
			>
				<Animated.Image
					source={{ uri: listing?.thumbnail_url || "" }}
					style={[styles.image, imageAnimatedStyle]}
					resizeMode='cover'
				/>

				<View style={styles.infoContainer}>
					<Text style={styles.name}>{listing?.name}</Text>
					<Text style={styles.location}>
						{listing?.room_type} in{" "}
						{listing?.smart_location}
					</Text>
					<Text style={styles.rooms}>
						{listing?.bedrooms} bedrooms · {listing?.beds}{" "}
						bed · {listing?.bathrooms} bathrooms
					</Text>
					<View
						style={{
							flexDirection: "row",
							gap: 4,
							alignItems: "center",
						}}
					>
						<Ionicons name='star' size={16} />
						<Text style={styles.ratings}>
							{listing?.review_scores_rating || 0 / 20} ·{" "}
						</Text>
					</View>
					<View style={styles.divider} />

					<View style={styles.hostView}>
						<View
							// source={{ uri: listing.host_picture_url }}
							style={styles.host}
						/>

						<View>
							<Text
								style={{ fontSize: 14, fontFamily: "mon" }}
							>
								Hosted by {"JOIN NGUYEN"}
							</Text>
							<Text
								style={{
									fontSize: 14,
									fontFamily: "mon-sb",
								}}
							>
								Host since {"12/12/2003"}
							</Text>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.detail}>
						<Ionicons name='thumbs-up-outline' size={24} />
						<View>
							<Text
								style={{
									fontFamily: "mon-b",
									fontSize: 16,
								}}
							>
								Summary
							</Text>
							<Text style={styles.description}>
								{listing?.summary}
							</Text>
						</View>
					</View>

					<View style={{ ...styles.detail, marginTop: 12 }}>
						<Ionicons name='car-outline' size={24} />
						<View>
							<Text
								style={{
									fontFamily: "mon-b",
									fontSize: 16,
								}}
							>
								Transit
							</Text>
							<Text style={styles.description}>
								{listing?.transit}
							</Text>
						</View>
					</View>

					<View style={{ ...styles.detail, marginTop: 12 }}>
						<Ionicons name='diamond-outline' size={24} />
						<View>
							<Text
								style={{
									fontFamily: "mon-b",
									fontSize: 16,
								}}
							>
								Amenities
							</Text>
							<Text style={styles.description}>
								{listing?.amenities?.join(" • ")}
							</Text>
						</View>
					</View>
				</View>
			</Animated.ScrollView>

			<Animated.View
				style={defaultStyles.footer}
				entering={SlideInDown.delay(200)}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TouchableOpacity style={styles.footerText}>
						<Text style={styles.footerPrice}>
							€{listing?.price}
						</Text>
						<Text>night</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() =>
							router.push(`/reservation/${listing?.id}`)
						}
						style={[
							defaultStyles.btn,
							{ paddingRight: 20, paddingLeft: 20 },
						]}
					>
						<Text style={defaultStyles.btnText}>
							Reserve
						</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	image: {
		height: IMG_HEIGHT,
		width: width,
	},
	infoContainer: {
		padding: 24,
		backgroundColor: "#fff",
	},
	name: {
		fontSize: 26,
		fontFamily: "mon-sb",
	},
	location: {
		fontSize: 18,
		marginTop: 10,
		fontFamily: "mon-sb",
	},
	rooms: {
		fontSize: 16,
		color: Colors.grey,
		marginVertical: 4,
		fontFamily: "mon",
	},
	ratings: {
		fontSize: 16,
		fontFamily: "mon-sb",
	},
	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: Colors.grey,
		marginVertical: 16,
	},
	host: {
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: Colors.grey,
	},
	hostView: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	footerText: {
		height: "100%",
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	footerPrice: {
		fontSize: 18,
		fontFamily: "mon-sb",
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
	bar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	header: {
		backgroundColor: "#fff",
		height: 100,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.grey,
	},
	description: {
		fontSize: 15,
		maxWidth: "90%",
		fontFamily: "mon",
		marginTop: 4,
		color: "black",
		borderWidth: 1,
		borderColor: "#e2e8f0",
		borderRadius: 20,
		padding: 14,
	},
	detail: {
		flexDirection: "row",
		gap: 12,
		alignItems: "flex-start",
	},
})

export default DetailsPage
