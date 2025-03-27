import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.any(),
})
