import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://" + "10.0.225.63" + ":5000",
})
