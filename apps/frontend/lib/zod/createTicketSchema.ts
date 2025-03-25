import { z } from 'zod'

export const ticketSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  status: z.string().min(3, 'Status must be at least 3 characters long'),
  priority: z.string().min(3, 'Priority must be at least 3 characters long'),
})
