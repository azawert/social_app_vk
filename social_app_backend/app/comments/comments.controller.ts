import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../prisma'
import { IRequest } from '../types/request.type'

export const createComment = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { description, postId } = req.body
			const userId = req.user
			if (!userId) {
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ message: 'User is not specified' })
				return
			}
			const createdComment = await prisma.comment.create({
				data: {
					description,
					post: {
						connect: {
							id: postId
						}
					},

					createdBy: {
						connect: {
							id: userId
						}
					}
				},
				include: {
					createdBy: true,
					post: true
				}
			})
			res.status(StatusCodes.CREATED).json(createdComment)
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
		}
	}
)

export const deleteComment = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { commentId } = req.params
			await prisma.comment.delete({
				where: {
					id: +commentId
				}
			})
			res.status(StatusCodes.NO_CONTENT).json({})
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
		}
	}
)

export const updateComment = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { commentId } = req.params
			const { description } = req.body

			const updatedComment = await prisma.comment.update({
				data: {
					description
				},
				where: {
					id: +commentId
				},
				include: {
					createdBy: true,
					post: true
				}
			})
			res.status(StatusCodes.OK).json(updatedComment)
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
		}
	}
)
