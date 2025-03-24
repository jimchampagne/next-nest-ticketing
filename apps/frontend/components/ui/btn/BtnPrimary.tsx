import { MouseEventHandler } from 'react'

type Props = {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  onClick?: MouseEventHandler
}

export function BtnPrimary({ className, type, children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={`p-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition cursor-pointer ease-in-out duration-250} ${className}`}
    >
      {children}
    </button>
  )
}
