'use client'
import { BtnPrimary } from '@components/ui/btn/BtnPrimary'
// import { LoadingSpinner } from '@components/ui/LoadingSpinner'
import { TicketCheck } from 'lucide-react'
import Link from 'next/link'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useApiMutation } from '@/lib/hooks/useApiMutation'
import { useForm } from '@/lib/hooks/useForm'
import { loginSchema } from '@/lib/zod/loginSchema'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const loginRequest = useApiMutation('/auth/login')
  const [loginError, setLoginError] = useState('')
  const { errors, handleSubmit, handleInputChange } = useForm(
    {
      email: '',
      password: '',
    },
    loginSchema,
    (data) => {
      setLoginError('')
      loginRequest.mutateAsync(
        { ...data },
        {
          onSuccess: () => {
            redirect('/dashboard')
          },
          onError: (error) => {
            console.error(error)
            setLoginError('Wrong email or password')
          },
        },
      )
    },
  )
  return (
    <div className="p-12 bg-grey rounded-[5px] flex flex-col items-center text-white">
      {/* <Icon name="lucide:ticket-check" className="!w-[40px] !h-[40px] mb-1 text-primary fill-current" /> */}
      <TicketCheck className="!w-[40px] !h-[40px] mb-1 text-primary" />
      <h1 className="text-center font-title mb-1 font-bold">NextTicket</h1>
      <h2 className="text-center font-title mb-8">Sign in to your account</h2>
      {/* Authenticate here */}
      <form onSubmit={handleSubmit} className="w-full mb-4">
        <div className="form-group mb-4">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={handleInputChange}
            required
          />
        </div>
        {errors?.email && <div className="form-error">{errors.email}</div>}
        <div className="form-group mb-4">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
        </div>
        {errors?.password && (
          <div className="form-error">{errors.password}</div>
        )}
        <BtnPrimary type={'submit'} className="w-full">
          {loginRequest.isPending ? <LoadingSpinner is-small /> : <p>Login</p>}
        </BtnPrimary>
        {loginError && !loginRequest.isPending && (
          <div className="form-error !text-center !mt-4">{loginError}</div>
        )}
      </form>
      <div className="text-[14px] flex gap-1">
        No account?
        <Link href="/register">Register here</Link>
      </div>
    </div>
  )
}
