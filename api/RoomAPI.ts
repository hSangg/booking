import forgetPassword from "@/app/(modals)/forgetPassword"
import { axiosClient } from "./AxiosClient"
import { createQueryString } from "@/app/utils/utilFunction"

export interface GetRoomCondition {
	room_type: string | null
	smart_location: string | null
	min_price: string | null
	max_price: string | null
	is_sort_price: boolean | null
}

export const RoomAPI = {
	getRoom: async (
		getRoomCondition: GetRoomCondition | null
	) => {
		try {
			let queryString = "/room/getRoom?"
			if (getRoomCondition) {
				queryString += createQueryString(getRoomCondition)
			}

			const res = await axiosClient.get(queryString)
			return res
		} catch (error) {}
	},
	getRoomById: async (id: string) => {
		try {
			const queryString = (
				"/room/getRoomInfo?room_id=" + id
			).trim()
			const res = await axiosClient.get(queryString)
			if (res.status === 200) {
				console.log("res=>>>>>>", res)
				return res
			}
		} catch (error) {
			console.log(error)
		}
	},
}
