import express from 'express'
import FakultasController from '../controllers/fakultas.controller.js'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import LogMiddleware from '../middleware/log.middleware.js'
import ProdiController from '../controllers/prodi.controller.js'
import {autenticateJwt} from '../middleware/auth.middleware.js'
const router = express.Router()

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

router.use(LogMiddleware)
router.use(autenticateJwt) // Middleware untuk memeriksa autentikasi

router.get('/fakultas',FakultasController.index)
router.get("/fakultas/:id",FakultasController.show)
router.post("/fakultas",FakultasController.store)
router.put("/fakultas/:id",FakultasController.update)
router.patch("/fakultas/:id",FakultasController.update) 
router.delete("/fakultas/:id",FakultasController.delete)

router.get('/prodi/:id', ProdiController.show)
router.patch('/prodi/:id', ProdiController.update)
router.delete('/prodi/:id', ProdiController.delete)

router.get('/prodi', ProdiController.index)
router.post('/prodi', ProdiController.store)
router.put('/prodi/:id', ProdiController.update)
router.delete('/prodi/:id', ProdiController.delete)

export default router
