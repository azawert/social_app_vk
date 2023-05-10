import { api } from '../api'
import { IUser } from '../types/authenticate.type'

export interface IRequestChangeStatus {
	status: string
}
export interface IRequestFriendAction {
	friendId: number
}
export interface IQuerySearchUser {
	name?: string
	lastName?: string
}
export const UserService = {
	async getUserInfo(id: number): Promise<IUser> {
		const resp = await api.get(`/users/${id}`)
		return resp.data
	},
	async getUserInfoByToken(): Promise<IUser> {
		const resp = await api.get('/users/me')
		return resp.data
	},
	async changeUserStatus(
		data: IRequestChangeStatus
	): Promise<{ status: string }> {
		const resp = await api.patch('/users/update-status', data)
		return resp.data
	},
	async userFriendAction(data: IRequestFriendAction): Promise<IUser> {
		const resp = await api.post('/users/friends', data)
		return resp.data
	},
	async userSearchByName(data?: IQuerySearchUser): Promise<IUser[]> {
		const resp = await api.get('/users/findUser', { params: data })
		return resp.data
	}
}
