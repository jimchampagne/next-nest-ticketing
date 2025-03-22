import { cookies } from 'next/headers'

export async function getSession() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value
  if (accessToken && refreshToken) {
    return {
      accessToken,
      refreshToken,
    }
  }
  return null
}
