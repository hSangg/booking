import listingsData from "@/assets/data/airbnb-listings.json"
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json"
import ExploreHeader from "@/components/ExploreHeader"
import Listing from "@/components/Listing"
import { Stack } from "expo-router"
import React, { useMemo, useState } from "react"
import { View } from "react-native"

const Index = () => {
	// const items = useMemo(() => listingsData as any, []);
	// const getoItems = useMemo(() => listingsDataGeo, []);
	const [category, setCategory] = useState<string>("Tiny homes")
	const items = useMemo(() => listingsData as any, [])
	const getoItems = useMemo(() => listingsDataGeo, [])
	const onDataChanged = (category: string) => {
		setCategory(category)
	}
	return (
		<View style={{ flex: 1, marginTop: 150, backgroundColor: "#fff" }}>
			<Stack.Screen
				options={{
					header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
				}}
			/>
			<Listing listings={items} category={category} />
		</View>
	)
}

export default Index
