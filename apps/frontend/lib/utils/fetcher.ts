export const apiFetcher = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + url, {
    ...options,
    headers: {
      ...options.headers,
    },
    credentials: 'include',
  })

  if (!res.ok) throw new Error('API fetch failed')

  return res.json()
}
