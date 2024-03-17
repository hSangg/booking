import listingsData from "@/assets/data/airbnb-listings.json"
import ExploreHeader from "@/components/ExploreHeader"
import ListingBottomSheet from "@/components/ListingBottomSheet"
import ListingMap from "@/components/ListingMap"
import { Stack } from "expo-router"
import React, { useState } from "react"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const Index = () => {
	// const items = useMemo(() => listingsData as any, []);
	// const getoItems = useMemo(() => listingsDataGeo, []);
	const [category, setCategory] = useState<string>("Tiny homes")
	// const items = useMemo(() => listingsData as any, [])
	// const getoItems = useMemo(() => listingsDataGeo, [])
	const onDataChanged = (category: string) => {
		setCategory(category)
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={{ flex: 1, marginTop: 150, backgroundColor: "#fff" }}>
				<Stack.Screen
					options={{
						header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
					}}
				/>
				{/* <Listing listings={items} category={category} /> */}
				<ListingMap listings={listingsData} />
				<ListingBottomSheet listing={listingsData} category={category} />
			</View>
		</GestureHandlerRootView>
	)
}

export default Index
