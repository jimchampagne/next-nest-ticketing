"use client"

import { useState } from "react"
import { BtnPrimary } from "@components/ui/btn/BtnPrimary"
import { LoadingSpinner } from "@components/ui/LoadingSpinner"
import Link from "next/link"

export default function Page() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function changeConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value)
  }

  // async function registerUser() {
  //   return "Authenticating"
  // }

  return (
    <div className="p-12 bg-grey rounded-[5px] flex flex-col items-center max-w-[320px] text-white">
      {/* <Icon name="lucide:notebook-pen" className="!w-[40px] !h-[40px] mb-[1rem] text-primary fill-current" /> */}
      <h1 className="text-center font-title mb-1 font-bold">NuxtTicket</h1>
      <h2 className="text-center font-title mb-8">Create your account</h2>
      <form className="w-full mb-4">
        <div className="form-group mb-4">
          <input
            id="name"
            value={name}
            onChange={changeName}
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group mb-4">
          <input
            id="email"
            value={email}
            onChange={changeEmail}
            type="email"
            placeholder="E-mail"
            required
          />
        </div>
        <div className="form-group mb-4">
          <input
            id="password"
            value={password}
            onChange={changePassword}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group mb-8">
          <input
            id="confirmPassword"
            value={confirmPassword}
            onChange={changeConfirmPassword}
            type="password"
            placeholder="Confirm Password"
            required
          />
        </div>
        <BtnPrimary className="w-full" type="submit">
          {loading ? <LoadingSpinner is-small /> : <p>Register</p>}
        </BtnPrimary>
      </form>
      { error ? <div className="error-message">{ error }</div> : null }
      <div className="mt-4 text-[12px]">
        Already have an account? <Link href="/login">Login here</Link>
      </div>
    </div>
  )
}
