type Props = {
  className?: string
}

export function Footer({ className }: Props) {
  return (
    <div
      className={`${className} min-h-[48px] border-t-[2px] border-solid border-primary/20 flex flex-col sm:flex-row justify-center items-center p-4 gap-4 text-primary text-[12px]`}
    >
      <p className="hover:text-secondary ease-in-out duration-150 cursor-pointer">
        © 2025 - Jim Champagne
      </p>
      <p className="hover:text-secondary ease-in-out duration-150 cursor-pointer">
        Cookie Policy
      </p>
      <p className="hover:text-secondary ease-in-out duration-150 cursor-pointer">
        Privacy Policy
      </p>
      <p className="hover:text-secondary ease-in-out duration-150 cursor-pointer">
        Terms & Conditions
      </p>
    </div>
  )
}
