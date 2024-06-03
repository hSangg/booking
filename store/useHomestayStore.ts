import { RoomAPI } from "@/api/RoomAPI"
import { Room } from "@/interface/Room"
import { create } from "zustand"

type State = {
	homeStayList: Room[]
}
type Action = {
	updateHomestayList: (room: State["homeStayList"]) => void
}

export const useHomestayStore = create<State & Action>(
	(set) => ({
		homeStayList: [],
		updateHomestayList: (homeStayList: Room[]) =>
			set(() => ({ homeStayList })),
	})
)
