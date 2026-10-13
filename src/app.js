import path from 'node:path'

import compression from 'compression'
import cors from 'cors'
import express from 'express'

import configureView from './config/view.js'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'
import apiRoutes from './routes/api.routes.js'
import webRoutes from './routes/web.routes.js'

const app = express()

configureView(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())

app.use('/storage/public', express.static(path.resolve(process.cwd(), 'storage/public')))

app.use('/', webRoutes)
app.use('/api', apiRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
