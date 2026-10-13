import mongoose from 'mongoose'
import { DATABASE_URL } from './env.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
}

export default mongoose
