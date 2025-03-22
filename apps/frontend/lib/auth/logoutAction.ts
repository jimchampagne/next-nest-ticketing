'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function logoutAction() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (refreshToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    if (!res.ok) {
      console.error('Logout failed')
      return { message: 'Logout failed' }
    }

    // If the backend responded successfully, clear the cookies
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    cookieStore.delete('user') // If you're storing user info as well

    return redirect('/login')
  } else {
    // If the backend didn't respond, logout anyway
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    cookieStore.delete('user') // If you're storing user info as well

    return redirect('/login')
  }
}
