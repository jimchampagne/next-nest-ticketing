import { TicketType } from '@/types/ticket'

export function TicketCard({
  className,
  ticket,
}: Readonly<{
  className?: string
  ticket: TicketType | null
}>) {
  return (
    <div
      className={`${className} rounded-md p-2.5 bg-grad-grey-2 shadow-xl border border-solid border-lightgrey text-white hover:text-dark hover:bg-primary ease-in-out duration-150 cursor-pointer`}
    >
      <div>{ticket?.title}</div>
    </div>
  )
}
