import { verifyToken } from '../utils/jwt.js'
import { apiResponse } from '../utils/response.js'

export const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization
  const match = typeof authHeader === 'string'
    ? /^Bearer\s+(\S+)$/i.exec(authHeader)
    : null

  if (!match) {
    return apiResponse({
      res,
      status: 401,
      message: 'Token Bearer wajib disertakan',
    })
  }

  let decoded

  try {
    decoded = verifyToken(match[1])
  } catch (error) {
    return apiResponse({
      res,
      status: 401,
      message: error.name === 'TokenExpiredError'
        ? 'Token sudah kedaluwarsa, silakan login kembali'
        : 'Token tidak valid',
    })
  }

  if (
    typeof decoded !== 'object' ||
    decoded === null ||
    typeof decoded.sub !== 'string' ||
    !/^[a-f\d]{24}$/i.test(decoded.sub)
  ) {
    return apiResponse({ res, status: 401, message: 'Token tidak valid' })
  }

  req.user = { id: decoded.sub }
  return next()
}