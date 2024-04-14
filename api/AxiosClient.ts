import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "///",
	responseType: "json",
	withCredentials: true,
})
