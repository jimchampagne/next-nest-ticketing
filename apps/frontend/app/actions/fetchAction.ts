'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function fetchAction<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const session = await getServerSession(authOptions)

  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE + url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: session?.accessToken
        ? `Bearer ${session?.accessToken}`
        : '', // Add Authorization header if token exists
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json() as Promise<T>
}
