export class AppError extends Error {
  /**
   * @param {string} message - Error description
   * @param {number} [statusCode=500] - HTTP status code
   * @param {any} [errors=null] - Additional validation or detail errors
   */
  constructor(message, statusCode = 500, errors = null) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}
