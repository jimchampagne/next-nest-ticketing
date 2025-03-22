'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { JWT } from '@/types/auth'
import { cookies } from 'next/headers'

// REGISTER
const RegisterFormSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.any(),
  confirmPassword: z.any(),
})

type RegisterFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
    }
  | undefined

// --- Register ---
export async function registerAction(
  state: RegisterFormState,
  formData: FormData,
) {
  // Validate form fields with Zod
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })
  // Return validation errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
    }
  }
  // Prepare data for insertion
  const { name, email, password } = validatedFields.data

  // Do the backend API Call
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
  // If Register response is not ok, show error message
  if (!res.ok) {
    return { message: 'Register failed' }
  }
  // if Register response is ok, set data
  const data: JWT = await res.json()

  // Set tokens via next/headers cookies()
  const cookieStore = await cookies()
  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    expires: data.expiresAt,
  })
  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  })
  cookieStore.set('user', JSON.stringify(data.user), {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  })
  // Successful -> Redirect to dashboard
  redirect('/dashboard')
}
