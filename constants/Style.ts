import { StyleSheet } from "react-native"
import Colors from "./Colors"

export const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FDFFFF",
	},
	inputField: {
		height: 44,
		borderWidth: 1,
		borderColor: "#ABABAB",
		borderRadius: 8,
		padding: 10,
		backgroundColor: "#fff",
	},
	btn: {
		backgroundColor: Colors.primary,
		height: 50,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	btnCustom_1: {
		backgroundColor: Colors.slate,
		height: 50,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	btnText: {
		color: "#fff",
		fontSize: 30,
		fontFamily: "damion",
	},
	btnIcon: {
		position: "absolute",
		left: 16,
	},
	footer: {
		position: "absolute",
		height: 80,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#fff",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderTopColor: Colors.grey,
		borderTopWidth: StyleSheet.hairlineWidth,
	},
})
