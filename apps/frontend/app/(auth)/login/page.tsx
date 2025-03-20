'use client'

import React, { useRef, useState } from 'react'
import { BtnPrimary } from '@components/ui/btn/BtnPrimary'
import { LoadingSpinner } from '@components/ui/LoadingSpinner'
import { TicketCheck } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function Page() {
  const email = useRef('')
  const password = useRef('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await signIn('credentials', {
        email: email.current,
        password: password.current,
        redirect: true,
        callbackUrl: '/dashboard',
      })
    } catch (error) {
      setError(error as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-12 bg-grey rounded-[5px] flex flex-col items-center text-white">
      {/* <Icon name="lucide:ticket-check" className="!w-[40px] !h-[40px] mb-1 text-primary fill-current" /> */}
      <TicketCheck className="!w-[40px] !h-[40px] mb-1 text-primary" />
      <h1 className="text-center font-title mb-1 font-bold">NextTicket</h1>
      <h2 className="text-center font-title mb-8">Sign in to your account</h2>
      {/* Authenticate here */}
      <form onSubmit={onSubmit} className="w-full mb-4">
        <div className="form-group mb-4">
          <input
            id="email"
            onChange={(e) => (email.current = e.target.value)}
            type="email"
            placeholder="E-mail"
            required
          />
        </div>
        <div className="form-group mb-8">
          <input
            id="password"
            onChange={(e) => (password.current = e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <BtnPrimary type={'submit'} className="w-full">
          {loading ? <LoadingSpinner is-small /> : <p>Login</p>}
        </BtnPrimary>
      </form>
      {error ? <div className="error-message">{error}</div> : null}
      <div className="text-[14px] flex gap-1">
        No account?
        <Link href="/register">Register here</Link>
      </div>
    </div>
  )
}
