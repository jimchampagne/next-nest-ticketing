import { getSession } from 'next-auth/react'

export const apiFetcher = async (url: string, options: RequestInit = {}) => {
  const session = await getSession() // Works client-side

  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
    },
  })

  if (!res.ok) throw new Error('API fetch failed')

  return res.json()
}
