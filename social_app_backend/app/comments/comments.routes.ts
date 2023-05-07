import express from 'express'

import { checkAuth } from '../middleware/check-auth'

import {
	createComment,
	deleteComment,
	updateComment
} from './comments.controller'

const router = express.Router()

router.post('/create', checkAuth, createComment)
router.put('/update/:commentId', checkAuth, updateComment)
router.delete('/delete/:commentId', checkAuth, deleteComment)

export default router
