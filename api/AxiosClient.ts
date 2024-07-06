import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://" + "26.21.145.88" + ":5000",
})
