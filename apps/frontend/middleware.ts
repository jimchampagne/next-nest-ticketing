// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { refreshAccessToken } from './lib/auth/refreshToken'

// Public routes
const publicRoutes = ['/login', '/register']
const protectedRoutes = ['/dashboard']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookieStore = await cookies()
  const loginUrl = new URL('/login', request.url)
  let accessToken = cookieStore.get('accessToken')?.value

  // If you're already on login or register route, allow the user to stay there
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // If there is no accessToken and route is protected, attempt to refresh the token
  if (
    !accessToken &&
    !publicRoutes.some((route) => pathname.startsWith(route))
  ) {
    await refreshAccessToken()
    accessToken = cookieStore.get('accessToken')?.value
  }

  // If there is no accessToken and the route is protected, redirect to login
  if (
    !accessToken &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(loginUrl)
  }

  // If user has an access token and is trying to visit /login or /register, redirect to dashboard
  if (
    (accessToken && pathname.startsWith('/login')) ||
    pathname.startsWith('/register')
  ) {
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}
