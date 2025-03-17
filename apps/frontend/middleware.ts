import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root path to /dashboard
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Add authentication check logic here
  // Example:
  // const isAuthenticated = checkAuth(request);
  // if (!isAuthenticated && pathname !== "/login") {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
}

// Example function to check authentication
// function checkAuth(request: NextRequest): boolean {
//   // Implement your authentication check logic here
//   return false;
// }