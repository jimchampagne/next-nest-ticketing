import { Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

// USED TO OVERRIDE TYPES ON JWT CALLBACKS

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      email: string
      name: string
    }
    accessToken: string
    refreshToken: string
    issuedAt: number
    expiresAt: number
  }

  interface User {
    user: {
      id: number
      email: string
      name: string
    }
    accessToken: string
    refreshToken: string
    issuedAt: number
    expiresAt: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: number
      email: string
      name: string
    }
    accessToken: string
    refreshToken: string
    issuedAt: number
    expiresAt: number
  }

  interface RefreshResponse {
    accessToken: string
    refreshToken: string
    issuedAt: number
    expiresAt: number
  }
}
