//TODO: добавить роуты
import express from 'express'

import { checkAuth } from '../middleware/check-auth'

import { upload } from '../helper/file-upload.middleware'

import {
	deleteUserProfile,
	getUserById,
	getUserSelfProfile,
	getUsersByName,
	handleFriendAction,
	updateStatus,
	updateUserProfile
} from './user.controller'

const router = express.Router()

router.get('/findUser', checkAuth, getUsersByName)
router.get('/me', checkAuth, getUserSelfProfile)
router.get('/:userId', checkAuth, getUserById)
router.post('/friends', checkAuth, handleFriendAction)
router.put('/update', checkAuth, upload.single('image'), updateUserProfile)
router.patch('/update-status', checkAuth, updateStatus)
router.delete('/delete-profile', checkAuth, deleteUserProfile)

export default router
