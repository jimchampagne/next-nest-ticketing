import { TicketType } from '@/types/ticket'

export function TicketCard({
  className,
  ticket,
}: Readonly<{
  className?: string
  ticket: TicketType | null
}>) {
  return (
    <div className={`${className} w-full p-2 horizontal-card`}>
      <div>{ticket?.title}</div>
    </div>
  )
}
