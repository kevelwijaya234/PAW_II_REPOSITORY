import bcrypt from 'bcryptjs'

/**
 * Hash password using auto-generated salt
 * @param {string} password - Plain text password
 * @param {number} [saltRounds=10] - Number of rounds to generate salt (default: 10)
 * @returns {Promise<string>} Hashed password
 */
const hashPassword = async (password, saltRounds = 10) => {
  return await bcrypt.hash(password, saltRounds)
}

/**
 * Compare plain text password with hashed password
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} Result of comparison
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

class PasswordHelper {
  static async hash(password, saltRounds = 10) {
    return await bcrypt.hash(password, saltRounds)
  }

  static async compare(password, hash) {
    return await bcrypt.compare(password, hash)
  }
}

export { hashPassword, comparePassword, PasswordHelper }
