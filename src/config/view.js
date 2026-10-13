import path from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import expressEjsLayouts from 'express-ejs-layouts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const configureView = (app) => {
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, '../views'))

  app.use(expressEjsLayouts)
  app.set('layout', 'layouts/main')

  app.use(express.static('public'))
}

export default configureView
