import jwt from 'jsonwebtoken'

import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js'

/**
 * Generate a JWT token
 * @param {object|string|Buffer} payload - Data to be encoded in token
 * @param {object} [options] - Additional JWT options
 * @returns {Promise<string>} Signed JWT token
 */
const generateToken = (payload, options = {}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
        ...options,
      },
      (err, token) => {
        if (err) return reject(err)
        resolve(token)
      },
    )
  })
}

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @param {object} [options] - Additional JWT verify options
 * @returns {Promise<object>} Decoded payload
 */
const verifyToken = (token, options = {}) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, options, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}

class JwtHelper {
  static async sign(payload, options = {}) {
    return generateToken(payload, options)
  }

  static async verify(token, options = {}) {
    return verifyToken(token, options)
  }
}

export { generateToken, verifyToken, JwtHelper }
