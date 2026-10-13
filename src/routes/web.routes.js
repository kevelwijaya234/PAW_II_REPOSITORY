import express from 'express'

import WelcomeController from '../controllers/welcome.controller.js'

const router = express.Router()

router.get('/', WelcomeController.index)

export default router
