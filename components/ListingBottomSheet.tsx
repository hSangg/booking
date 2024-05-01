import Colors from "@/constants/Colors"
import { Homestay } from "@/interface/Homestay"
import BottomSheet, {
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet"
import React, { useMemo, useRef } from "react"
import { View } from "react-native"
import Listings from "./Listing"

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
