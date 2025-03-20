import NextAuth, { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE + '/auth/refresh',
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      },
    )
    console.log('Refreshed')
    const response = await res.json()

    return {
      ...token,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresIn: response.expiresIn,
      issuedAt: response.issuedAt,
    }
  } catch (error) {
    console.error(error)
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

        const data = await res.json()

        if (res.ok && data) {
          return data
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // USER object is the WHOLE response from the backend
      // Set the token equal to the entire response of the backend during login
      if (user) {
        console.log('First login, setting user data on token:', user)
        return { ...token, ...user }
      }

      // If the token hasn't expired, return the current token (keep user info intact)
      if (new Date().getTime() < token.expiresIn) {
        console.log('Token is still valid, returning token:', token)
        return token
      }

      // If the token is expired, refresh the token
      console.log('Token expired, refreshing token...')
      const refreshedToken = await refreshToken(token)
      console.log('New token acquired:', refreshedToken)
      return refreshedToken
    },
    async session({ token, session }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.expiresIn = token.expiresIn
      session.issuedAt = token.issuedAt
      console.log('Session data', session)
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
