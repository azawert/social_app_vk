import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import authenticateRouter from './app/authentication/auth.routes'
import commentRouter from './app/comments/comments.routes'
import postRouter from './app/posts/post.routes'
import { prisma } from './app/prisma'
import userRouter from './app/user/user.routes'

dotenv.config()
const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}
	const __dirname = path.resolve()
	app.use(express.json())
	app.use(cors())
	app.use('/api/', authenticateRouter)
	app.use('/api/users', userRouter)
	app.use('/api/posts', postRouter)
	app.use('/api/comments', commentRouter)
	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))
	const PORT = process.env.port ?? 5000
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.log(e)
		await prisma.$disconnect()
		process.exit(1)
	})

//TODO: сделать ендпоинт для статичных кратинок, сделать комментарии
