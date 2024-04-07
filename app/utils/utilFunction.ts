export const UtilFunction = {
	caculateDate: (startDate: string, endDate: string) => {
		if (startDate == "" || endDate == "") return 0

		// Convert start and end dates to milliseconds
		const startMs = new Date(startDate).getTime()
		const endMs = new Date(endDate).getTime()

		// Calculate the difference in milliseconds
		const differenceMs = Math.abs(endMs - startMs)

		// Convert milliseconds to days
		const days = Math.ceil(
			differenceMs / (1000 * 60 * 60 * 24)
		)

		return days
	},
}
