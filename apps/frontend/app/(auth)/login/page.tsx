'use client'
import { BtnPrimary } from '@components/ui/btn/BtnPrimary'
// import { LoadingSpinner } from '@components/ui/LoadingSpinner'
import { TicketCheck } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { loginAction } from '@/lib/auth/loginAction'

export default function Page() {
  const [state, action, pending] = useActionState(loginAction, undefined)
  return (
    <div className="p-12 bg-grey rounded-[5px] flex flex-col items-center text-white">
      {/* <Icon name="lucide:ticket-check" className="!w-[40px] !h-[40px] mb-1 text-primary fill-current" /> */}
      <TicketCheck className="!w-[40px] !h-[40px] mb-1 text-primary" />
      <h1 className="text-center font-title mb-1 font-bold">NextTicket</h1>
      <h2 className="text-center font-title mb-8">Sign in to your account</h2>
      {/* Authenticate here */}
      <form action={action} className="w-full mb-4">
        <div className="form-group mb-4">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            required
          />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}
        <div className="form-group mb-8">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {state?.errors?.password && <p>{state.errors.password}</p>}
        <BtnPrimary type={'submit'} className="w-full">
          {pending ? <LoadingSpinner is-small /> : <p>Login</p>}
        </BtnPrimary>
      </form>
      <div className="text-[14px] flex gap-1">
        No account?
        <Link href="/register">Register here</Link>
      </div>
    </div>
  )
}
