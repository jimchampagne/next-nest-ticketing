import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

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
    expiresIn: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: AppUser
    accessToken: string
    refreshToken: string
    issuedAt: number
    expiresIn: number
  }
}
