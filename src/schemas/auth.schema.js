import z from 'zod'

const passwordSchema = z
.string()
.trim()
.min(8, 'Password minimal 8 karakter').max(20, 'Password maksimal 20 karakter')
.refine((value) => buffer.byteLength(value, 'utf8') <= 72, 
{'message': 'Password maksimal 72 karakter'})

export const registerSchema = z.object({
  name: z.string().trim().min(3, 'Name minimal 3 karakter'),
  email: z.email(),
  password: passwordSchema,
})

export const loginSchema = z.object({
  email: z.email(),
  password: passwordSchema,
})

