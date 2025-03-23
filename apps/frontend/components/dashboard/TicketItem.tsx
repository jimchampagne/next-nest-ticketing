import { TicketType } from '@custom-types/ticket'
import { TicketStatusIcon } from '../ui/ticket/TicketStatus'

export function TicketItem({
  className,
  tickets,
}: Readonly<{
  className?: string
  tickets?: TicketType[] | null
}>) {
  return (
    <>
      {tickets?.map((ticket) => (
        <div
          key={ticket.id}
          className={`${className} group/ticket rounded-md p-2.5 bg-grad-grey-2 shadow-xl border border-solid border-primary text-white hover:text-dark hover:bg-primary ease-in-out duration-150 cursor-pointer`}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="">{ticket.title}</p>
            <TicketStatusIcon ticketStatus={ticket.status} />
          </div>
        </div>
      ))}
    </>
  )
}
