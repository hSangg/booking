import Colors from "@/constants/Colors"
import { defaultStyles } from "@/constants/Style"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "@gorhom/bottom-sheet"
import {
	Stack,
	useLocalSearchParams,
	useRouter,
} from "expo-router"
import { useEffect, useState } from "react"
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, {
	FadeIn,
	FadeOut,
	SlideInDown,
} from "react-native-reanimated"
// @ts-ignore

import sampleRoomReservation from "@/assets/data/reservation.datasample.json"
import { Room } from "@/interface/Room"

import { UtilFunction } from "../utils/utilFunction"
import { SafeAreaView } from "react-native-safe-area-context"
import { Calendar } from "react-native-calendars"

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity)

const guestsGropus = [
	{
		name: "Adults",
		text: "Ages 13 or above",
		count: 0,
	},
	{
		name: "Children",
		text: "Ages 2-12",
		count: 0,
	},
	{
		name: "Infants",
		text: "Under 2",
		count: 0,
	},
	{
		name: "Pets",
		text: "Pets allowed",
		count: 0,
	},
]

const bookedDate = ["2024-05-20", "2024-05-16"]

const DetailPage = () => {
	const { id } = useLocalSearchParams()
	const [dateRange, setDateRange] = useState({
		startDate: "",
		endDate: "",
	})
	const [markedDates, setMarkedDates] = useState({})

	const [dataPrice, setDataPrice] = useState({
		numberOfDay: UtilFunction.caculateDate(
			dateRange.startDate,
			dateRange.endDate
		),
		total: 0,
	})

	// get data of room by id, render to UI

	// I load data sample to UI
	const sampleRoom: any = sampleRoomReservation
	const price = sampleRoom.price

	//

	const [openCard, setOpenCard] = useState(0)
	const router = useRouter()

	useEffect(() => {
		setDataPrice(() => {
			let numberOfDay = UtilFunction.caculateDate(
				dateRange.startDate,
				dateRange.endDate
			)

			console.log(numberOfDay)
			return {
				numberOfDay: numberOfDay,
				total: Number.parseFloat(
					(numberOfDay * (sampleRoom.price || 0)).toFixed(2)
				),
			}
		})
	}, [dateRange.startDate, dateRange.endDate])

	const onClearAll = () => {
		setOpenCard(0)
	}

	const handleDayPress = (date: any) => {
		console.log("date: >>>>", date)
		const { startDate, endDate } = dateRange
		console.log("start: ", startDate, " end: ", endDate)
		if (isDateXAfterDateY(startDate, endDate)) {
			console.log("1")
		}
		if (!startDate) {
			// Set selected date as start date
			setDateRange({
				startDate: date.dateString,
				endDate: "",
			})
			setMarkedDates({
				[date.dateString]: {
					startingDay: true,
					color: "#FF385C",
				},
			})
		} else if (startDate && !endDate) {
			// Set selected date as end date
			if (date.dateString !== startDate) {
				setDateRange({
					startDate,
					endDate: date.dateString,
				})
				setMarkedDates({
					...markedDates,
					[date.dateString]: {
						endingDay: true,
						color: "#FF385C",
					},
				})
			}
		} else {
			// Clear the date range and set the selected date as start date
			setDateRange({
				startDate: date.dateString,
				endDate: "",
			})
			setMarkedDates({
				[date.dateString]: {
					startingDay: true,
					color: "#FF385C",
				},
			})
		}
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					header: () => (
						<SafeAreaView
							style={{ ...styles.card, padding: 20 }}
						>
							<Text style={styles.previewText}>
								Having amazing trip in {sampleRoom.name} 🔥
							</Text>
						</SafeAreaView>
					),
				}}
			></Stack.Screen>
			<ScrollView style={{ flex: 1 }}>
				<View
					style={{ ...styles.card, paddingBottom: 200 }}
				>
					{openCard != 1 && (
						<AnimatedTouchableOpacity
							onPress={() => setOpenCard(1)}
							style={styles.cardPreview}
							entering={FadeIn.duration(200)}
							exiting={FadeOut.duration(200)}
						>
							<Text style={styles.previewText}>When</Text>
							<Text style={styles.previewdData}>
								Any week
							</Text>
						</AnimatedTouchableOpacity>
					)}

					<View style={{ ...styles.card, padding: 20 }}>
						<Image
							source={{
								uri: sampleRoom.thumbnail_url || "",
							}}
							style={[styles.image]}
							resizeMode='cover'
						/>
					</View>

					{openCard == 1 && (
						<Text style={styles.cardHeader}>
							When's your trip?
						</Text>
					)}

					{openCard == 1 && (
						<Animated.View>
							<Calendar
								firstDay={0}
								style={{
									borderRadius: 10,
									elevation: 4,
									margin: 40,
								}}
								onDayPress={handleDayPress}
								minDate='2024-01-01'
								maxDate='2025-01-01'
								hideExtraDays={true}
								markingType='period'
								markedDates={generateMarkedDates(
									dateRange.startDate,
									dateRange.endDate
								)}
							/>
						</Animated.View>
					)}
				</View>

				{/* Footer */}
			</ScrollView>

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
					<TouchableOpacity
						style={{
							height: "100%",
							justifyContent: "center",
						}}
						onPress={onClearAll}
					>
						<Text
							style={{
								fontSize: 18,
								fontFamily: "mon-sb",
							}}
						>
							Total: € {dataPrice.total}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							defaultStyles.btn,
							{ paddingRight: 20, paddingLeft: 50 },
						]}
						onPress={() => router.back()}
					>
						<Ionicons
							name='search-outline'
							size={24}
							style={defaultStyles.btnIcon}
							color={"#fff"}
						/>
						<Text style={defaultStyles.btnText}>Book</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</GestureHandlerRootView>
	)
}

function isDateXAfterDateY(dateX: string, dateY: string) {
	const x = new Date(dateX)
	const y = new Date(dateY)

	return x > y
}

function generateMarkedDates(
	startDateString: string,
	endDateString: string
) {
	if (startDateString == "" || endDateString == "")
		return {}

	let markedDates: any = {}

	let startDate = new Date(startDateString)
	let endDate = new Date(endDateString)

	// If start date is greater than end date, return empty markedDates object
	if (startDate > endDate) {
		return markedDates
	}

	// Add starting day
	markedDates[startDateString] = {
		startingDay: true,
		color: "#FF385C",
	}

	// Add days between start and end date
	let currentDate = new Date(startDate)
	while (currentDate < endDate) {
		currentDate.setDate(currentDate.getDate() + 1)
		let dateString = currentDate.toISOString().slice(0, 10)
		markedDates[dateString] = {
			marked: true,
			color: "#FF385C",
			dotColor: "transparent",
		}
	}

	// Add ending day
	markedDates[endDateString] = {
		endingDay: true,
		color: "#FF385C",
		dotColor: "transparent",
	}
	console.log("markedDates: =>>>>", markedDates)

	return {
		...markedDates,
		"2024-05-20": {
			disabled: true,
			disableTouchEvent: true,
		},
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: "white",
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 14,
		margin: 10,
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		gap: 20,
	},
	cardHeader: {
		fontFamily: "mon-b",
		fontSize: 24,
		padding: 20,
	},
	cardBody: {
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	cardPreview: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},

	searchSection: {
		height: 50,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ABABAB",
		borderRadius: 8,
		marginBottom: 16,
	},
	searchIcon: {
		padding: 10,
	},
	inputField: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	placesContainer: {
		flexDirection: "row",
		gap: 25,
	},
	place: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	placeSelected: {
		borderColor: Colors.grey,
		borderWidth: 2,
		borderRadius: 10,
		width: 100,
		height: 100,
	},
	previewText: {
		fontFamily: "mon-sb",
		fontSize: 14,
		color: Colors.grey,
	},
	previewdData: {
		fontFamily: "mon-sb",
		fontSize: 14,
		color: Colors.dark,
	},

	guestItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
	},
	image: {
		width: "100%",
		height: 300,
		borderRadius: 10,
	},
	itemBorder: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.grey,
	},
})
export default DetailPage
