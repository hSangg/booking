import { axiosClient } from "./AxiosClient"

export const UserAPI = {
	login: async (username: string, password: string) => {
		const response = await axiosClient.get("")
	},
}
