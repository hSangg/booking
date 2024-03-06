import Colors from "@/constants/Colors"
import { defaultStyles } from "@/constants/Style"
import { useWarmUpBrowser } from "@/hooks/useWarnUpBrowser"
import { useOAuth } from "@clerk/clerk-expo"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React from "react"
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

const Login = () => {
	useWarmUpBrowser()

	const router = useRouter()
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_facebook" })

	const onPress = React.useCallback(async () => {
		try {
			const res = await startOAuthFlow()
			console.log(res)
		} catch (err) {
			console.error("OAuth error", err)
		}
	}, [])
	return (
		<View style={style.container}>
			<TextInput
				autoCapitalize='none'
				placeholder='email'
				style={[defaultStyles.inputField, { marginBottom: 30 }]}
			/>
			<TouchableOpacity style={defaultStyles.btn}>
				<Text style={defaultStyles.btnText}>Continue</Text>
			</TouchableOpacity>

			<View style={style.seperatorView}>
				<View
					style={{
						borderBottomColor: "#000",
						flex: 1,

						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				></View>
				<Text style={style.seperator}>or</Text>
				<View
					style={{
						borderBottomColor: "#000",
						flex: 1,

						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				></View>
			</View>

			<View>
				<TouchableOpacity style={style.btnOutline}>
					<Ionicons
						name='call-outline'
						size={24}
						style={defaultStyles.btnIcon}
					/>
					<Text style={style.btnOutlineText}>Continue with Phone</Text>
				</TouchableOpacity>
				<View style={{ marginVertical: 5 }}></View>
				<TouchableOpacity onPress={onPress} style={style.btnOutline}>
					<Ionicons
						name='logo-google'
						size={24}
						style={defaultStyles.btnIcon}
					/>
					<Text style={style.btnOutlineText}>Continue with Google</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FDFFFF",
		padding: 26,
	},
	seperatorView: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		marginVertical: 30,
	},
	seperator: {
		fontFamily: "mon-sb",
		color: Colors.grey,
	},
	btnOutline: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: Colors.grey,
		height: 50,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingHorizontal: 10,
	},
	btnOutlineText: {
		color: "#000",
		fontSize: 16,
		fontFamily: "mon-sb",
	},
})

export default Login
