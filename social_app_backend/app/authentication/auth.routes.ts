import express from 'express'

import { upload } from '../helper/file-upload.middleware'

import { authenticate, registration } from './auth.controller'

const router = express.Router()

router.post('/registration', upload.single('image'), registration)
router.post('/authenticate', authenticate)

export default router
