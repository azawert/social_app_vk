import { api } from '../api'
import { IRegistrationForm } from '../modules/auth/Registration'
import { IResponse, IResponseRegistration } from '../types/authenticate.type'

export interface IRequestAuthentication {
	email: string
	password: string
}

export const AuthenticateService = {
	async authenticate(data: IRequestAuthentication): Promise<IResponse> {
		const response = await api.post('/authenticate', data)
		return response.data
	},
	async registration(data: IRegistrationForm): Promise<IResponseRegistration> {
		const response = await api.post('/registration', data)
		return response.data
	}
}
