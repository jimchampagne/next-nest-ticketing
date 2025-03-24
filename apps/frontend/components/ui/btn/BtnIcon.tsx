import { MouseEventHandler } from 'react'

type Props = {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  onClick: MouseEventHandler
}

export function BtnIcon({ className, type, children, onClick }: Props) {
  return (
    <button
      type={type || 'button'}
      className={`bg-lightgrey rounded-sm flex items-center justify-center w-6 h-6 hover:bg-primary transition duration-250 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
