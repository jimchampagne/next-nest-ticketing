import Link from "next/link"
import { TicketCheck } from "lucide-react"
import { SidebarLink } from "@components/ui/SidebarLink"

export function Sidebar({
  className,
}: Readonly<{
  className?: string
}>) {
  return (
    <div className={`${className} min-w-[180px] max-w-[180px] border-r-[1px] border-solid border-primary/50 px-1`}>
      <div className="mb-[24px] h-14 flex items-center">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 py-2 px-4"
        >
          <TicketCheck className="!w-[30px] !h-[30px] text-primary" />
          <p className="text-white text-[18px]">NuxtTicket</p>
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <SidebarLink href="/dashboard" text="Dashboard" />
        <SidebarLink href="/dashboard/projects" text="Projects" />
        <SidebarLink href="/dashboard/boards" text="Boards" />
        <SidebarLink href="/dashboard/tickets" text="Tickets" />
      </div>
    </div>
  )
}
