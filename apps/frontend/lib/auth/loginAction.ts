'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { JWT } from '@/types/auth'
import { cookies } from 'next/headers'

// LOGIN

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.any(),
})

type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

// --- Login ---
export async function loginAction(state: LoginFormState, formData: FormData) {
  // Validate form fields with Zod
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  // Return validation errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
    }
  }
  // Prepare data for insertion
  const { email, password } = validatedFields.data

  // Do the backend API Call
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  // If login response is not ok, show error message
  if (!res.ok) {
    return { message: 'Login failed' }
  }
  // if login response is ok, set data
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
