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
          ? "w-[1rem] h-[1rem] border-[2px]"
          : "w-[2rem] h-[2rem] border-[3px]"
      } ${
        isBig
          ? "w-[4rem] h-[4rem] border-[4px]"
          : "w-[2rem] h-[2rem] border-[3px]"
      }`}
    />
  )
}
