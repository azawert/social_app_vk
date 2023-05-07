//TODO:
import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../prisma'
import { IRequest } from '../types/request.type'

export const getUserById = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { userId } = req.params
			console.log(req.params)
			if (!userId) {
				res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad request' })
				return
			}
			const foundUser = await prisma.user.findUnique({
				where: {
					id: +userId
				},
				include: {
					comments: true,

					friends: true,
					posts: true
				}
			})
			if (!foundUser) {
				res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
				return
			}
			res.status(StatusCodes.OK).json(foundUser)
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
		}
	}
)

export const deleteUserProfile = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const userId = req.user
			if (!userId) {
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ message: 'User is not specified' })
				return
			}
			const foundUser = await prisma.user.delete({
				where: {
					id: +userId
				}
			})
			res.status(StatusCodes.NO_CONTENT).json()
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
		}
	}
)

export const updateUserProfile = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const userId = req.user
			const {
				firstName,
				lastName,
				middleName,
				university,
				hometown,
				dateOfBirth,
				phoneNumber,
				email
			} = req.body
			const image = req.file?.path
			const data = {
				firstName,
				lastName,
				middleName,
				university,
				hometown,
				dateOfBirth,
				phoneNumber,
				email,
				image
			}
			if (!userId) {
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ message: 'No user specified' })
			}
			const updatedUserInfo = await prisma.user.update({
				where: {
					id: userId
				},
				data
			})
			res.status(StatusCodes.OK).json(updatedUserInfo)
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
		}
	}
)

export const updateStatus = asyncHandler(
	async (req: IRequest, res: Response) => {
		const { status } = req.body
		const userId = req.user
		if (!userId) {
			res.status(StatusCodes.BAD_REQUEST).json({ message: 'No user specified' })
			return
		}
		const findUserAndUpdateStatus = await prisma.user.update({
			data: {
				status
			},
			where: {
				id: +userId
			},
			select: {
				status: true
			}
		})
		res.status(StatusCodes.OK).json(findUserAndUpdateStatus)
	}
)

export const handleFriendAction = asyncHandler(
	async (req: IRequest, res: Response) => {
		const userId = req.user
		const { friendId } = req.body
		if (!userId) {
			res.status(StatusCodes.BAD_REQUEST).json({ message: 'No user specified' })
			return
		}
		const user = await prisma.user.findUnique({
			where: {
				id: +userId
			},
			include: {
				friends: true
			}
		})
		const isFriendAlreadyInList = user?.friends.some(
			friend => friend.id === friendId
		)
		async function deleteFriend(
			userId: number,
			friendId: number
		): Promise<any> {
			try {
				const updatedUser = await prisma.user.update({
					data: {
						friends: {
							disconnect: {
								id: friendId
							}
						}
					},
					where: {
						id: userId
					},
					include: {
						friends: true
					}
				})
				const friendUser = await prisma.user.update({
					data: {
						friends: {
							disconnect: {
								id: userId
							}
						}
					},
					where: {
						id: friendId
					}
				})
				return updatedUser
			} catch (e: any) {
				res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({ message: e.message })
				return
			}
		}
		async function addFriend(userId: number, friendId: number): Promise<any> {
			try {
				const updatedUser = await prisma.user.update({
					where: {
						id: userId
					},
					data: {
						friends: {
							connect: {
								id: friendId
							}
						}
					},
					include: {
						friends: true
					}
				})
				const friendUser = await prisma.user.update({
					where: {
						id: friendId
					},
					data: {
						friends: {
							connect: {
								id: userId
							}
						}
					}
				})
				return updatedUser
			} catch (e: any) {
				res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({ message: e.message })
				return
			}
		}

		if (isFriendAlreadyInList) {
			const updated = await deleteFriend(+userId, friendId)
			res.status(StatusCodes.OK).json(updated)
		} else {
			const updated = await addFriend(+userId, friendId)
			res.status(StatusCodes.OK).json(updated)
		}
	}
)
