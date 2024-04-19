import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://192.168.1.66:5000",
})
