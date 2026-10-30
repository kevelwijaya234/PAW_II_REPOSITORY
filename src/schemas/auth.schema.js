import z from 'zod'

const emailSchema = z.string()
  .trim()
  .toLowerCase()
  .pipe(z.email('Format email tidak valid'))

const passwordSchema = z.string()
  .min(8, 'Password minimal 8 karakter')
  .refine((value) => Buffer.byteLength(value, 'utf8') <= 72, {
    message: 'Password maksimal 72 byte UTF-8',
  })

export const registerSchema = z.object({
  username: z.string().trim().min(3, 'Username minimal 3 karakter'),
  email: emailSchema,
  password: passwordSchema,
})

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})