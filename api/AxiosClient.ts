import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://" + "10.0.249.127" + ":5000",
})
