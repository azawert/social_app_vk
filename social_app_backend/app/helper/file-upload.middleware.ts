import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/') // путь для сохранения файлов
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		const filename = `${Date.now()}-${Math.floor(Math.random() * 100000)}${ext}`
		cb(null, filename) // имя файла, сохраняемое на сервере
	}
})

export const upload = multer({ storage })
