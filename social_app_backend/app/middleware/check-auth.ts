import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

import { IRequest } from '../types/request.type'

export const checkAuth = async (
	req: IRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization
	if (!token || !token.startsWith('Bearer')) {
		res
			.status(StatusCodes.FORBIDDEN)
			.json({ message: 'Forbidden. Invalid token' })
		return
	}
	try {
		const isTokenValid = jwt.verify(
			token.substring(6).trim(),
			process.env.ACCESS_TOKEN!
		)
		req.user = Number(isTokenValid)
		next()
	} catch (e: any) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e })
	}
}
