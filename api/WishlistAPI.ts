import { axiosClient } from "./AxiosClient"

export const WishlistAPI = {
	getWishListByUserId: async () => {
		const res = await axiosClient.get(
			"wishList/getWishList"
		)
	},
	addToWishlist: async (
		user_id: string,
		room_id: string,
		token: string
	) => {
		try {
			const res = await axiosClient.post(
				"/wishList/addWishList",
				{
					user_id,
					room_id,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (res.status === 200) console.log(res)
		} catch (error) {
			console.log("error at add to wishlist: ", error)
		}
	},
	removeFromWishlist: async (
		user_id: string,
		room_id: string,
		token: string
	) => {
		const url = `/wishList/removeWishList?user_id=${user_id}&room_id=${room_id}`
		const res = await axiosClient.delete(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
