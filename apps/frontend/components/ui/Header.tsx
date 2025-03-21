'use client'
import { LogOut, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function Header({
  className,
}: Readonly<{
  className?: string
}>) {
  const logOut = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: '/login',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className={`${className} relative z-0 h-14 border-b-[1px] border-solid border-primary/50 flex justify-between sm:justify-end items-center gap-5 p-4 md:p-[16px_21px_16px_16px] w-full`}
    >
      <div className="absolute z-0 bottom-0 left-0 translate-y-[100%] w-full bg-linear-to-b from-primary/10 to-dark h-[58px]" />
      {/* Profile */}
      <div className="flex items-center gap-2">
        <div className="rounded-full p-1 w-8 h-8 flex items-center justify-center bg-primary">
          <User name="lucide:user" className="text-dark w-[18px]" />
        </div>
        <p className="text-sm text-white">Jim Champagne</p>
      </div>
      {/* Logout */}
      <button
        type={'button'}
        onClick={logOut}
        className="group/logout flex items-center justify-center rounded-[5px] group- cursor-pointer w-8 h-8 bg-primary ease-in-out duration-200"
      >
        <LogOut
          name="lucide:log-out"
          className="text-dark w-[18px] group-hover/logout:text-white ease-in-out duration-200"
        />
      </button>
    </div>
  )
}
