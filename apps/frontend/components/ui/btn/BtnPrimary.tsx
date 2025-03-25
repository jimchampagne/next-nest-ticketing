import { MouseEventHandler } from 'react'

type Props = {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  disabled?: boolean
  onClick?: MouseEventHandler
}

export function BtnPrimary({
  className,
  type,
  children,
  disabled = false,
  onClick,
}: Props) {
  const disabledClass = disabled
    ? 'bg-lightgrey hover:bg-lightgrey'
    : 'bg-primary hover:bg-primary/90'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type || 'button'}
      className={`p-2 text-white text-sm rounded-lg transition cursor-pointer ease-in-out duration-250} ${className} ${disabledClass}`}
    >
      {children}
    </button>
  )
}
