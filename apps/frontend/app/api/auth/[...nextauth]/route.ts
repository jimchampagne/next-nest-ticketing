import NextAuth, { NextAuthOptions, User } from 'next-auth'
import { JWT, RefreshResponse } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshToken(token: JWT): Promise<JWT> {
  console.log("Refreshing, Current refreshToken:", token.refreshToken.slice(-10))
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE + '/auth/refresh',
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      },
    )
    const refresh: RefreshResponse = await res.json()
    console.log("Refreshed, New refreshToken:", refresh.refreshToken.slice(-10))
    return {
      user: {
        id: token.user.id,
        name: token.user.name,
        email: token.user.email
      },
      accessToken: refresh.accessToken,
      refreshToken: refresh.refreshToken,
      expiresAt: refresh.expiresAt,
      issuedAt: refresh.issuedAt,
    }
  } catch (error) {
    console.log('Unable to refresh token, returning old token')
    console.log('Error:', error)
    return token
  }
}

export const authOptions: NextAuthOptions = {
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { email, password } = credentials

        const res = await fetch(
          process.env.NEXT_PUBLIC_API_BASE + '/auth/login',
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (res.status === 401) {
          console.log(res.statusText)
          return null
        }

        const AuthResponse: User = await res.json()

        if (res.ok && AuthResponse) {
          return AuthResponse
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // user is the data the authorize returns when logging in
      // rename to avoid confusion
      const authResponse = user
      // user or renamedlogin will only exist on login, will be skipped on all subsequent jwt callbacks
      if (authResponse) {
        const constructedToken = {
          user: {
            id: authResponse.user.id,
            name: authResponse.user.name,
            email: authResponse.user.email
          },
          accessToken: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          issuedAt: authResponse.issuedAt,
          expiresAt: authResponse.expiresAt
        }
        return constructedToken
      }
      // THIS If will kick in on all subsequent JWT callbacks/Session getters
      if (Date.now() < token.expiresAt) {
        console.log('Token is still valid, returning token:', token)
        return token
      }
      // The next code will kick in if token is expired
      const refreshedToken = await refreshToken(token)
      return refreshedToken
    },
    async session({ token, session }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.expiresAt = token.expiresAt
      session.issuedAt = token.issuedAt
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
