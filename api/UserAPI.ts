import forgetPassword from "@/app/(modals)/forgetPassword"
import { axiosClient } from "./AxiosClient"

export const UserAPI = {
	login: async (email: string, password: string) => {
		console.log("call")

		const response = await axiosClient.post(
			"/auth/signIn",
			{
				email,
				password,
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
		console.log("call_login")
		return response
	},

	register: async (
		email: string,
		name: string,
		password: string,
		phone_number: string
	) => {
		console.log("call signup")
		const response = await axiosClient.post(
			"/auth/signUp",
			{
				email,
				name,
				password,
				phone_number,
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
		return response
	},
	forgetPassword: async (email: string) => {
		const response = await axiosClient.post(
			"/auth/forgotPassword",
			{
				email,
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
		console.log(response)
		return response.data
	},
	verityOtp: async (OTP: string, email: string) => {
		const response = await axiosClient.post(
			"/auth/checkOtp",
			{
				OTP,
				email,
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
		return response.data
	},
}
