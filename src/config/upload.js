import fs from 'node:fs'
import path from 'node:path'

import multer from 'multer'

export const createUpload = (subFolder = '', options = {}) => {
  const targetDir = path.resolve(process.cwd(), 'storage/public', subFolder)

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, targetDir)
    },

    filename: (req, file, cb) => {
      const uniqueName =
        `${Date.now()}-${Math.round(Math.random() * 1e9)}` + path.extname(file.originalname)

      cb(null, uniqueName)
    },
  })

  return multer({ storage, ...options })
}

const upload = createUpload()

export default upload
