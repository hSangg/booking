import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://10.0.244.241:5000",
})
