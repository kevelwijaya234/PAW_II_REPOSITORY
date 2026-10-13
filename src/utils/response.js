import z from 'zod'

const apiResponse = ({ res, status, message, data }) => {
  return res.status(status).json({
    meta: {
      status,
      message,
    },
    data,
  })
}

const apiResponseValidation = ({ res, status = 422, message = 'Validation error', errors }) => {
  return res.status(status).json({
    meta: {
      status,
      message,
    },
    errors: z.flattenError(errors).fieldErrors,
  })
}

export { apiResponse, apiResponseValidation }
