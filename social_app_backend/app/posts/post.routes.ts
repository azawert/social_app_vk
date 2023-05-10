import express from 'express'

import { checkAuth } from '../middleware/check-auth'

import { upload } from './../helper/file-upload.middleware'
import {
	createPost,
	deletePost,
	getAllFriendsPost,
	getPostById,
	getUserPostsByUserId,
	handleLikePost,
	updatePost
} from './posts.controller'

const router = express.Router()

router.get('/friends-posts', checkAuth, getAllFriendsPost)
router.get('/:postId', checkAuth, getPostById)
router.get('/posts/:userId', checkAuth, getUserPostsByUserId)
router.post('/create-post', checkAuth, upload.single('image'), createPost)
router.post('/like/:postId', checkAuth, handleLikePost)
router.put('/:postId', checkAuth, upload.single('image'), updatePost)
router.delete('/:postId', checkAuth, deletePost)

export default router
