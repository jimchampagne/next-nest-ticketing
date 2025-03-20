export function LoadingSpinner({
  isSmall,
  isBig,
}: Readonly<{
  isSmall?: boolean
  isBig?: boolean
}>) {
  return (
    <div
      className={`spinner inline-block border-white border-t-primary rounded-full border-solid ${
        isSmall
          ? 'w-[10px] h-[10px] border-[2px]'
          : 'w-[20px] h-[20px] border-[3px]'
      } ${
        isBig
          ? 'w-[40px] h-[40px] border-[4px]'
          : 'w-[20px] h-[20px] border-[3px]'
      }`}
    />
  )
}
