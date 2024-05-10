import React, { useState, useEffect, useRef } from "react"
import { Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { router } from "expo-router"

const CountdownTimer = () => {
	const [time, setTime] = useState(5) // 2 minutes in seconds
	const [timerEnded, setTimerEnded] = useState(false)
	const navigation = useNavigation()
	const timerRef = useRef(null) as any

	useEffect(() => {
		timerRef.current = setInterval(() => {
			setTime((prevTime) => {
				if (prevTime > 0) {
					return prevTime - 1
				} else {
					clearInterval(timerRef.current)
					setTimerEnded(true)
					return 0
				}
			})
		}, 1000)

		return () => clearInterval(timerRef.current) // Cleanup function to clear the interval
	}, [])

	useEffect(() => {
		if (timerEnded) {
			navigation.goBack()
		}
	}, [timerEnded, navigation])

	// Convert seconds to minutes and seconds
	const minutes = Math.floor(time / 60)
	const seconds = time % 60

	return (
		<View>
			<Text
				style={{
					fontSize: 24,
					textAlign: "center",
					marginTop: 20,
				}}
			>
				Countdown Timer
			</Text>
			<Text
				style={{
					fontSize: 48,
					textAlign: "center",
					marginTop: 10,
				}}
			>
				{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
			</Text>
		</View>
	)
}

export default CountdownTimer
