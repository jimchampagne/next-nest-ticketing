import { DefaultSession } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'

type AppUser = {
  id: number
  email: string
  name: string
}

declare module 'next-auth' {
  interface Session {
    user: AppUser & DefaultSession['user']
    accessToken: string
    refreshToken: string
    issuedAt: number
    expiresIn: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: AppUser
    accessToken: string
    refreshToken: string
    issuedAt: number
    expiresIn: number
  }
}
