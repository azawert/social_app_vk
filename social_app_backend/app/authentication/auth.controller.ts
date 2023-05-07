import bcrypt from 'bcrypt'
import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import StatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

import { IRequest } from '../types/request.type'

import { prisma } from './../prisma'

export const registration = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const {
				firstName,
				lastName,
				password,
				email,
				phoneNumber,
				dateOfBirth,
				hometown,
				status,
				middleName,
				university
			} = req.body
			const saltCount = 10
			const image = req.file?.path.substring(8)
			const hashedPassword = await bcrypt.hash(password, saltCount)
			const createdUser = await prisma.user.create({
				data: {
					email,
					firstName,
					lastName,
					password: hashedPassword,
					phoneNumber,
					image,
					dateOfBirth,
					hometown,
					middleName,
					status,
					university
				}
			})
			const token = jwt.sign(String(createdUser.id), process.env.ACCESS_TOKEN!)
			res.status(StatusCodes.CREATED).json({ createdUser, token })
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
		}
	}
)

export const authenticate = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { email, password } = req.body
			const user = await prisma.user.findUnique({
				where: {
					email
				},
				include: {
					friends: true,
					posts: true
				}
			})
			if (!user) {
				res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
				return
			}
			const isPasswordCorrect = await bcrypt.compare(password, user.password)
			if (!isPasswordCorrect) {
				res.status(StatusCodes.FORBIDDEN).json({ message: 'Wrong credentials' })
				return
			}
			const stringId = String(user.id)
			const token = jwt.sign(stringId, process.env.ACCESS_TOKEN!)

			res.status(200).json({ user, token })
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
		}
	}
)
