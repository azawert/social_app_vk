import { Request } from 'express'

export interface IRequest extends Request {
	user?: number // необходимо для записи ид пользователя
}
