import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../prisma'
import { IRequest } from '../types/request.type'

export const getPostById = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { postId } = req.params
			const post = await prisma.post.findUnique({
				where: {
					id: +postId
				},
				include: {
					comments: {
						include: {
							createdBy: true
						}
					},
					createdBy: true,
					postLikes: true
				}
			})
			if (!post) {
				res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
				return
			}
			res.status(StatusCodes.OK).json(post)
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
		}
	}
)

export const getAllFriendsPost = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const userId = req.user
			if (!userId) {
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ message: 'User is not specified' })
				return
			}
			const user = await prisma.user.findUnique({
				where: {
					id: userId
				},
				include: {
					friends: true
				}
			})
			const posts = await prisma.post.findMany({
				where: {
					userId: {
						in: user?.friends.map(friend => friend.id)
					}
				},
				include: {
					comments: {
						select: {
							description: true,
							id: true,
							createdBy: true
						}
					}
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
			res.status(StatusCodes.OK).json(posts)
		} catch (e: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: req.user })
		}
	}
)

export const deletePost = asyncHandler(async (req: IRequest, res: Response) => {
	try {
		const { postId } = req.params
		await prisma.post.delete({
			where: {
				id: +postId
			}
		})
		res.status(StatusCodes.NO_CONTENT).json({})
	} catch (e: any) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
	}
})

export const createPost = asyncHandler(async (req: IRequest, res: Response) => {
	try {
		const { description } = req.body
		const userId = req.user
		const image = req.file?.path
		if (!userId) {
			res.status(StatusCodes.BAD_REQUEST).json({ message: 'No user specified' })
			return
		}
		const createdPost = await prisma.post.create({
			data: {
				description,
				createdBy: {
					connect: {
						id: Number(userId)
					}
				},
				image
			}
		})
		res.status(StatusCodes.CREATED).json(createdPost)
	} catch (e: any) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
	}
})

export const updatePost = asyncHandler(async (req: IRequest, res: Response) => {
	try {
		const { postId } = req.params
		const { description } = req.body
		const image = req.file?.path
		const postToUpdate = await prisma.post.update({
			where: {
				id: +postId
			},
			data: {
				image: image ?? null,
				description
			},
			include: {
				comments: true,
				createdBy: true
			}
		})
		res.status(StatusCodes.OK).json(postToUpdate)
	} catch (e: any) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
	}
})

export const handleLikePost = asyncHandler(
	async (req: IRequest, res: Response) => {
		const userId = req.user
		const { postId } = req.params
		const postLikes = await prisma.post.count({
			where: {
				id: +postId,
				postLikes: {
					some: {
						id: userId
					}
				}
			}
		})
		const isPostAlreadyLiked = postLikes > 0
		const likePost = async () => {
			await prisma.post.update({
				where: {
					id: +postId
				},
				data: {
					postLikes: {
						connect: {
							id: userId
						}
					}
				}
			})
		}
		const dislikePost = async () => {
			await prisma.post.update({
				where: {
					id: +postId
				},
				data: {
					postLikes: {
						disconnect: {
							id: userId
						}
					}
				}
			})
		}
		isPostAlreadyLiked ? await dislikePost() : await likePost()
		res.status(204).json({})
	}
)
