import bcrypt from 'bcryptjs'

class PasswordHelper {
  static async hash(password) {
    return bcrypt.hash(password, 10)
  }

  static async compare(password, hash) {
    return bcrypt.compare(password, hash)
  }
}

export { PasswordHelper }