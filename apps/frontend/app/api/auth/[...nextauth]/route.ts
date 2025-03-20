import NextAuth, { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/auth/refresh', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token.refreshToken}`,
    },
  })
  const refreshResponse = await res.json()
  return {
    ...token,
    refreshResponse,
  }
}

export const authOptions: NextAuthOptions = {
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
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
        const loginResponse = await res.json()
        if (res.ok && loginResponse) {
          return loginResponse
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user }
      if (new Date().getTime() < token.expiresIn) return token
      return await refreshToken(token)
    },
    async session({ token, session }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
