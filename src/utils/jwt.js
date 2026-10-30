import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js'

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: JWT_EXPIRES_IN,
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ['HS256'],
  })
}

class JwtHelper {
  static sign(payload) {
    return generateToken(payload)
  }

  static verify(token) {
    return verifyToken(token)
  }
}

export { generateToken, verifyToken, JwtHelper }