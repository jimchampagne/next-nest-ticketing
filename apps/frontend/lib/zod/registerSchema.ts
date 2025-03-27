import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.any(),
  confirmPassword: z.any(),
})
