import { axiosClient } from "./AxiosClient"

export const UserAPI = {
	login: async (email: string, password: string) => {
		console.log("call")

		const response = await axiosClient.post(
			"/auth/signIn",
			{
				email: email,
				password: password,
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
		console.log("call_done")
		return response
	},

	register: async (email: string, name: string, password: string, phone_number: string) => {
		console.log("call signup")
		const response = await axiosClient.post(
			"/auth/signUp",
			{
				email: email,
				name: name,
				password: password,
				phone_number: phone_number
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
	}
}
