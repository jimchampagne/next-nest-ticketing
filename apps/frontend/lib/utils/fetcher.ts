import { UnauthorizedError } from './error'

export const apiFetcher = async (url: string, options: RequestInit = {}) => {
  let isRefreshing = false
  const apiBase = process.env.NEXT_PUBLIC_API_BASE
  let response = await fetch(`${apiBase}${url}`, {
    ...options,
    headers: {
      ...options.headers,
    },
    credentials: 'include',
  })

  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true
      const refreshResponse = await fetch(`${apiBase}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      })

      if (refreshResponse.status === 200) {
        response = await fetch(`${apiBase}${url}`, {
          ...options,
          headers: {
            ...options.headers,
          },
          credentials: 'include',
        })
      }

      if (refreshResponse.status === 401) {
        throw new UnauthorizedError()
      }
      isRefreshing = false
    }
  }

  if (!response.ok) throw new Error('API fetch failed')

  return response.json()
}
