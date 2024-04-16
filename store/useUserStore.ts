import { create } from "zustand"
export interface User {
	username: string
	phoneNumber: string
	email: string
	isLogin: boolean
}

type State = {
	user: User
}

type Action = {
	updateUser: (user: State["user"]) => void
}

// Create your store, which includes both state and (optionally) actions
export const useUserStore = create<State & Action>(
	(set) => ({
		user: {
			username: "",
			email: "",
			phoneNumber: "",
			isLogin: false,
		},
		updateUser: (user: User) => set(() => ({ user: user })),
	})
)
