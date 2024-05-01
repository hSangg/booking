import { UserAPI } from "@/api/UserAPI"
import Colors from "@/constants/Colors"
import { defaultStyles } from "@/constants/Style"
import { useWarmUpBrowser } from "@/hooks/useWarnUpBrowser"
import { User, useUserStore } from "@/store/useUserStore"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

const Login = () => {
	useWarmUpBrowser()
	const [data, setData] = useState({
		email: "",
		password: "",
	})

	const updateUser = useUserStore(
		(state) => state.updateUser
	)

	const router = useRouter()
	const handleTextInputChange = async (
		text: string,
		inputType: string
	) => {
		setData((pre) => ({ ...pre, [inputType]: text }))
	}

	const handleLogin = async () => {
		try {
			console.log("run")
			const res = await UserAPI.login(
				data.email,
				data.password
			)
			if (res.status === 200) {
				const { name, email, phone_number } =
					res?.data?.data
				const user: User = {
					username: name,
					email,
					phoneNumber: phone_number,
					isLogin: true,
				}
				updateUser(user)
				router.push("/(tabs)/profile")
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={style.container}>
			<TextInput
				id='email'
				autoCapitalize='none'
				placeholder='email'
				style={[
					defaultStyles.inputField,
					{ marginBottom: 10 },
				]}
				onChangeText={(e) => {
					handleTextInputChange(e, "email")
				}}
			/>

			<TextInput
				id='password'
				secureTextEntry
				autoCapitalize='none'
				placeholder='password'
				style={[
					defaultStyles.inputField,
					{ marginBottom: 30 },
				]}
				onChangeText={(e) => {
					handleTextInputChange(e, "password")
				}}
			/>

			<TouchableOpacity
				onPress={handleLogin}
				style={defaultStyles.btn}
			>
				<Text style={defaultStyles.btnText}>Continue</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					router.push("/(modals)/inputEmail")
				}}
				style={{
					...defaultStyles.btnCustom_1,
					marginTop: 15,
				}}
			>
				<Text style={defaultStyles.btnText}>
					Forget Your Password?
				</Text>
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
				<TouchableOpacity
					onPress={() => {
						router.push("/(modals)/signup")
						// router.push("/(information)/congatulation")
					}}
					style={style.btnOutline}
				>
					<Ionicons
						name='log-in-outline'
						size={24}
						style={defaultStyles.btnIcon}
					/>
					<Text style={style.btnOutlineText}>Sign Up</Text>
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
