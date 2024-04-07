// import listingsData from "@/assets/data/airbnb-listings.json"
import homeStayData from "@/assets/data/room.json"
import ExploreHeader from "@/components/ExploreHeader"
import ListingBottomSheet from "@/components/ListingBottomSheet"
import ListingMap from "@/components/ListingMap"
import { Homestay } from "@/interface/Homestay"
import { Stack } from "expo-router"
import React, { useMemo, useState } from "react"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const Index = () => {
	const homeStayList: Homestay[] = homeStayData
	const [category, setCategory] =
		useState<string>("Tiny homes")

	const onDataChanged = (category: string) => {
		setCategory(category)
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
				{/* <Listing listings={items} category={category} /> */}
				<ListingMap listings={homeStayList.slice(0, 10)} />
				<ListingBottomSheet
					listing={homeStayList.slice(0, 10)}
					category={category}
				/>
			</View>
		</GestureHandlerRootView>
	)
}

export default Index
