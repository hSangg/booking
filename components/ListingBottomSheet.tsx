import { View, Text } from "react-native"
import React, { useMemo } from "react"
import { Homestay } from "@/interface/Homestay"
import BottomSheet, {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet"
import { useRef } from "react"
import Listings from "./Listing"
import Colors from "@/constants/Colors"
import { GestureHandlerRootView } from "react-native-gesture-handler"

interface Props {
	listing: Homestay[]
	category: string
}

const ListingBottomSheet = ({
	listing,
	category,
}: Props) => {
	const bottomSheeRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(() => ["10%", "100%"], [])

	return (
		<BottomSheetModalProvider>
			<BottomSheet
				index={1}
				enableContentPanningGesture={false}
				// enablePanDownToClose={false}
				ref={bottomSheeRef}
				snapPoints={snapPoints}
				handleIndicatorStyle={{
					backgroundColor: Colors.grey,
				}}
			>
				<View style={{ flex: 1 }}>
					<Listings
						listings={listing}
						category={category}
					/>
				</View>
			</BottomSheet>
		</BottomSheetModalProvider>
	)
}

export default ListingBottomSheet
