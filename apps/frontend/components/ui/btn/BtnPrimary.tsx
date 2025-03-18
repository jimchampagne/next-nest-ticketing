export function BtnPrimary({
  className,
  type,
  children,
}: Readonly<{
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}>) {
  return (
    <button
      type={type || 'button'}
      className={`p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition cursor-pointer ease-in-out duration-250} ${className}`}
    >
      {children}
    </button>
  )
}
