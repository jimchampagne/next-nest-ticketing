import Link from "next/link"
import { House, Boxes, ClipboardList, Tickets } from "lucide-react"

type textEnum = "Dashboard" | "Projects" | "Boards" | "Tickets"

export function SidebarLink({
  className,
  href,
  text,
}: Readonly<{
  className?: string
  href: string
  text: textEnum
}>) {
  return (
    <Link
      className={`py-2 px-4 bg-transparent group !text-white hover:!bg-primary hover:!text-dark rounded-xl flex items-center gap-2 ${className}`}
      href={href}
    >
      {text === "Dashboard" && (
        <House
          name="lucide:house"
          className="!text-primary group-hover:!text-dark transition ease-in-out duration-250"
        />
      )}
      {text === "Projects" && (
        <Boxes
          name="lucide:boxes"
          className="!text-primary group-hover:!text-dark transition ease-in-out duration-250"
        />
      )}
      {text === "Boards" && (
        <ClipboardList
          name="lucide:clipboard-list"
          className="!text-primary group-hover:!text-dark transition ease-in-out duration-250"
        />
      )}
      {text === "Tickets" && (
        <Tickets
          name="lucide:tickets"
          className="!text-primary group-hover:!text-dark transition ease-in-out duration-250"
        />
      )}
      {text}
    </Link>
  )
}
