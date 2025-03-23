'use server'

import { JWT } from '@/types/auth'
import { cookies } from 'next/headers'

export async function refreshAccessToken() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (refreshToken) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/auth/refresh`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    )

    // If the response is not OK, log the error and return a failure message
    if (!res.ok) {
      console.log('Refreshing token failed')
      return { message: 'Refreshing token failed' }
    }
    const data: JWT = await res.json()

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

    return {
      newAccessToken: data.accessToken,
    }
  } else {
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    cookieStore.delete('user')
    return {
      newAccessToken: null,
    }
  }
}
