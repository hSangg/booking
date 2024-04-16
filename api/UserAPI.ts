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
}
