import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { refreshAccessToken } from './lib/auth/refreshToken'

const publicRoutes = ['/login', '/register']
const protectedRoutes = ['/dashboard']

export async function middleware(request: NextRequest) {
  const loginUrl = new URL('/login', request.url)
  const dashboardUrl = new URL('/dashboard', request.url)
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // PUBLIC ROUTES
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    // If logged in, redirect to dashboard
    if (accessToken || refreshToken) {
      return NextResponse.redirect(dashboardUrl)
    }
    return NextResponse.next()
  }

  // PROTECTED ROUTES
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!accessToken) {
      // Try refreshing token
      const { newAccessToken } = await refreshAccessToken()

      if (newAccessToken) {
        return NextResponse.next()
      }
      return NextResponse.redirect(loginUrl)
    }
  }

  // ROOT REDIRECTION
  if (pathname === '/') {
    return accessToken
      ? NextResponse.redirect(dashboardUrl)
      : NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
