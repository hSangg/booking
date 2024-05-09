// import listingsData from "@/assets/data/airbnb-listings.json"
import { RoomAPI } from "@/api/RoomAPI"
import ExploreHeader from "@/components/ExploreHeader"
import ListingBottomSheet from "@/components/ListingBottomSheet"
import ListingMap from "@/components/ListingMap"
import { Stack } from "expo-router"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const Index = () => {
	// const homeStayList: Homestay[] = homeStayData
	const [category, setCategory] =
		useState<string>("Tiny homes")

	const onDataChanged = (category: string) => {
		setCategory(category)
	}

	const [homeStayList, setHomeStayList] = useState<any>([])

	useEffect(() => {
		getInitialRoom()
	}, [])

	const getInitialRoom = async () => {
		try {
			const getRoomCondition: any = null
			const res = await RoomAPI.getRoom(getRoomCondition)
			setHomeStayList(res?.data.rooms)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					marginTop: 150,
					backgroundColor: "#fff",
				}}
			>
				<Stack.Screen
					options={{
						header: () => (
							<ExploreHeader
								onCategoryChanged={onDataChanged}
							/>
						),
					}}
				/>

				<ListingMap listings={homeStayList} />
				<ListingBottomSheet
					listing={homeStayList}
					category={category}
				/>
			</View>
		</GestureHandlerRootView>
	)
}

export default Index
