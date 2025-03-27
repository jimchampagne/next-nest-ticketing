import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register']
const protectedRoutes = ['/dashboard']

export async function middleware(request: NextRequest) {
  const loginUrl = new URL('/login', request.url)
  const dashboardUrl = new URL('/dashboard', request.url)
  const { pathname } = request.nextUrl

  const authCookie = request.cookies.get('accessToken')
  const isAuthenticated = !!authCookie

  // PROTECTED ROUTES
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(loginUrl)
    }
  }

  // PUBLIC ROUTES
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    // If logged in, redirect to dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(dashboardUrl)
    }
    return NextResponse.next()
  }

  // ROOT REDIRECTION
  if (pathname === '/') {
    return isAuthenticated
      ? NextResponse.redirect(dashboardUrl)
      : NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
}
