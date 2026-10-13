import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.email({ message: 'Invalid email address format' }),
})
