import {
	View,
	Text,
	StyleSheet,
	Dimensions,
} from "react-native"
import React, { useState } from "react"
import { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { Homestay } from "@/interface/Homestay"
import { useRouter } from "expo-router"
import MapView from "react-native-map-clustering"

interface Props {
	listings: any[]
}

const INITIAL_REGION_VIETNAM = {
	latitude: 14.0583,
	longitude: 108.2772,
	latitudeDelta: 10,
	longitudeDelta: 10,
}

const ListingMap = ({ listings }: Props) => {
	const router = useRouter()
	const [mapInitialized, setMapInitialized] =
		useState(false)

	const onMarkSelected = (mark: Homestay) => {
		router.push(`/listing/${mark.id}`)
	}

	const onMapReady = async () => {
		if (mapInitialized) {
			return
		}

		// initialize map data here

		setMapInitialized(true)
	}
	const renderCluster = (cluster: any) => {
		const { id, geometry, onPress, properties } = cluster
		return (
			<Marker
				key={id}
				onPress={onPress}
				coordinate={{
					longitude: geometry.coordinates[0],
					latitude: geometry.coordinates[1],
				}}
			>
				<View style={styles.cluster}>
					<Text style={styles.clusterText}>
						{properties.point_count}
					</Text>
				</View>
			</Marker>
		)
	}
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				onLayout={onMapReady}
				animationEnabled={false}
				clusterColor='#fff'
				showsUserLocation
				provider={PROVIDER_GOOGLE}
				showsMyLocationButton
				renderCluster={renderCluster}
				initialRegion={INITIAL_REGION_VIETNAM}
			>
				{listings.map((x: Homestay, i: number) => {
					return (
						<Marker
							onPress={() => onMarkSelected(x)}
							key={i}
							coordinate={{
								latitude: x.latitude
									? parseFloat(x.latitude)
									: 0, // If latitude is null, default to 0
								longitude: x.longitude
									? parseFloat(x.longitude)
									: 0, // If longitude is null, default to 0
							}}
						>
							<View style={styles.marker}>
								<Text style={styles.markerText}>
									₤{x.price}
								</Text>
							</View>
						</Marker>
					)
				})}
			</MapView>
		</View>
	)
}

export default ListingMap

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		position: "absolute",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		flex: 1,
	},
	marker: {
		padding: 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#e11d48",
		elevation: 5,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 10,
		},
	},
	cluster: {
		padding: 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#1d4ed870",
		elevation: 5,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 10,
		},
	},
	markerText: {
		fontSize: 14,
		color: "white",
		// fontFamily: "mon-sb",
	},
	clusterText: {
		fontSize: 14,
		color: "white",
		// fontFamily: "mon-sb",
	},
	locateBtn: {
		position: "absolute",
		top: 70,
		right: 20,
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 10,
		},
	},
})
