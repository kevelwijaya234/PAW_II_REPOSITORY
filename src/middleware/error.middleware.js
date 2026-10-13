import z, { ZodError } from 'zod'

import { AppError } from '../errors/app-error.js'

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  let errors = err.errors || null

  if (err instanceof ZodError) {
    statusCode = 422
    message = 'Validation error'
    errors = z.flattenError(err).fieldErrors
  } else if (err.code === 11000) {
    statusCode = 409
    const fields = err.keyValue ? Object.keys(err.keyValue) : []
    const fieldName = fields.join(', ') || 'field'
    message = `Duplicate value entered for ${fieldName}`
    errors = err.keyValue
      ? Object.fromEntries(
          Object.entries(err.keyValue).map(([field, value]) => [
            field,
            [`${field} '${value}' already exists`],
          ]),
        )
      : null
  } else if (err.type === 'entity.parse.failed') {
    statusCode = 400
    message = 'Malformed JSON payload'
  }

  const isProduction = process.env.NODE_ENV === 'production'

  return res.status(statusCode).json({
    meta: {
      status: statusCode,
      message,
    },
    ...(errors && { errors }),
    ...(!isProduction && statusCode === 500 && { stack: err.stack }),
  })
}

export const notFoundHandler = (req, res, next) => {
  if (req.originalUrl.startsWith('/api') || req.xhr || req.accepts('json')) {
    return next(new AppError(`Resource not found: ${req.method} ${req.originalUrl}`, 404))
  }

  return res.status(404).render('pages/404', {
    title: '404 - Page Not Found',
  })
}
