import { createQueryString } from "@/app/utils/utilFunction"
import { SearchOptions } from "@/interface/SearchOptions"
import { axiosClient } from "./AxiosClient"
import { Linking } from 'react-native';
export const RoomAPI = {
	getRoom: async (
		getRoomCondition: SearchOptions | null
	) => {
		try {
			let queryString = "/room/getRoom?"
			if (getRoomCondition) {
				queryString += createQueryString(getRoomCondition)
			}
			console.log("queryString: ", queryString)
			const res = await axiosClient.get(queryString)
			console.log("res get room: ", res)
			if (res.status === 200) return res.data

			return null
		} catch (error) {
			return null
		}
	},
	getRoomById: async (id: string) => {
		try {
			const queryString = (
				"/room/getRoomInfo?room_id=" + id
			).trim()
			const res = await axiosClient.get(queryString)

			if (res.status === 200) {
				return res
			}
		} catch (error) {
			console.log(error)
		}
	},
	reservation: async (
		user_id: string,
		room_id: string,
		start_date: string,
		end_date: string,
		token: string
	) => {
		try {
			const result = await axiosClient.post(
				"/booking/bookRoom",
				{
					user_id,
					room_id,
					start_date,
					end_date,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(result.data);

			if (result.status === 201 && result.data) {
				return { res: true, data: result.data };
			} else {
				return { res: false, data: null };
			}
		} catch (error) {
			console.error("Error making reservation request:", error);
			return { res: false, data: null };
		}

	},
	getReservationRoomByUserId: async (
		user_id: string,
		token: string
	) => {
		try {
			const url = `/booking/getTrip?user_id=${user_id}`
			const response = await axiosClient.get(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.status === 200) {
				return response.data.data
			}
		} catch (error) {
			console.log(
				"error at get reservation by user_id ",
				error
			)
		}
	},
	payment: async (
		id: string
	) => {
		try {
			console.log(id);
			const result = await axiosClient.post(
				"booking/payment",
				{ reserve_id: id },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log(result.status);

			if (result.status === 200) {
				Linking.openURL(result?.data?.data?.payUrl).catch((err) =>
					console.error("Couldn't load page", err)
				);
			} else {
				console.error("Payment request failed with status:", result.status);
			}
		} catch (error) {
			console.error("Error making payment request:", error);
		}
	}
}

/**
 * GET /booking/getTrip (user_id) --> get trips of user by id
 *
 *
 *
 *
 *
 */
