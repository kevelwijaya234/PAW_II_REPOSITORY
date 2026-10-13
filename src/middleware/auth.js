import { verifyToken } from '../utils/jwt.js'
import { apiResponse } from '../utils/response.js'

export const authenticateJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return apiResponse({
      res,
      status: 401,
      message: 'Unauthorized: No token provided',
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = await verifyToken(token)
    req.user = decoded
    next()
  } catch (error) {
    return apiResponse({
      res,
      status: 401,
      message: `Unauthorized: ${error.message}`,
    })
  }
}
