import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ADD AUTH LOGIC HERE
  // const isAuthenticated = checkAuth(request);
  // if (!isAuthenticated && pathname !== "/login") {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next()
}
