import 'dotenv/config'

export const APP_PORT = process.env.APP_PORT ?? '3000'
export const DATABASE_URL = process.env.DATABASE_URL ?? 'mongodb://localhost:27017/mydb'
export const JWT_SECRET = process.env.JWT_SECRET ?? 'supersecretkey'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1d'
