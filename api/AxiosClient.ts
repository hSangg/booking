import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://" + "10.0.237.240" + ":5000",
})
