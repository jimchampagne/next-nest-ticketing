'use client'

import { useActionState } from 'react'
import { BtnPrimary } from '@components/ui/btn/BtnPrimary'
import { LoadingSpinner } from '@components/ui/LoadingSpinner'
import { NotebookPen } from 'lucide-react'
import Link from 'next/link'
import { registerAction } from '@/lib/auth/registerAction'

export default function Page() {
  const [state, action, pending] = useActionState(registerAction, undefined)

  return (
    <div className="p-12 bg-grey rounded-[5px] flex flex-col items-center max-w-[320px] text-white">
      <NotebookPen className="!w-[40px] !h-[40px] mb-[1rem] text-primary" />
      <h1 className="text-center font-title mb-1 font-bold">NuxtTicket</h1>
      <h2 className="text-center font-title mb-8">Create your account</h2>
      <form action={action} className="w-full mb-4">
        <div className="form-group mb-4">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}
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
        <div className="form-group mb-4">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {state?.errors?.password && <p>{state.errors.password}</p>}
        <div className="form-group mb-8">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
          />
        </div>
        {state?.errors?.confirmPassword && (
          <p>{state.errors.confirmPassword}</p>
        )}
        <BtnPrimary className="w-full" type="submit">
          {pending ? <LoadingSpinner is-small /> : <p>Register</p>}
        </BtnPrimary>
      </form>
      <div className="mt-4 text-[12px]">
        Already have an account? <Link href="/login">Login here</Link>
      </div>
    </div>
  )
}
