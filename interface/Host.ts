export interface Host {
	_id: string
	name: string
	email: string
	email_verified_at?: Date
	password: string
	remember_token?: string
	created_at?: Date
	phone_number?: string
	description?: string
	profile_image?: string
}
