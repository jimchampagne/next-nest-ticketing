'use client'

import { useApiMutation } from '@/lib/hooks/useApiMutation'
import { useForm } from '@/lib/hooks/useForm'
import { registerSchema } from '@/lib/zod/registerSchema'
import { BtnPrimary } from '@components/ui/btn/BtnPrimary'
import { LoadingSpinner } from '@components/ui/LoadingSpinner'
import { NotebookPen } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const registerRequest = useApiMutation('/auth/register')
  const [registerError, setRegisterError] = useState('')
  const { errors, handleSubmit, handleInputChange } = useForm(
    {
      name: '',
      email: '',
      password: '',
    },
    registerSchema,
    (data) => {
      registerRequest.mutateAsync(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            redirect('/dashboard')
          },
          onError: (error) => {
            console.error(error)
            setRegisterError('Wrong email or password')
          },
        },
      )
    },
  )
  return (
    <div className="p-12 bg-grey rounded-[5px] flex flex-col items-center max-w-[320px] text-white">
      <NotebookPen className="!w-[40px] !h-[40px] mb-[1rem] text-primary" />
      <h1 className="text-center font-title mb-1 font-bold">NuxtTicket</h1>
      <h2 className="text-center font-title mb-8">Create your account</h2>
      <form onSubmit={handleSubmit} className="w-full mb-4">
        <div className="form-group mb-4">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleInputChange}
            required
          />
        </div>
        {errors?.name && <div className="form-error">{errors.name}</div>}
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
        <div className="form-group mb-8">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleInputChange}
            required
          />
        </div>
        {errors?.confirmPassword && (
          <div className="form-error">{errors.confirmPassword}</div>
        )}
        <BtnPrimary className="w-full" type="submit">
          {registerRequest.isPending ? (
            <LoadingSpinner is-small />
          ) : (
            <p>Register</p>
          )}
        </BtnPrimary>
        {registerError && (
          <div className="form-error !text-center !mt-4">{registerError}</div>
        )}
      </form>
      <div className="mt-4 text-[12px]">
        Already have an account? <Link href="/login">Login here</Link>
      </div>
    </div>
  )
}
