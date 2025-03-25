'use client'
import { TicketCard } from '@/components/ticket/TicketCard'
import { useApiQuery } from '@/lib/hooks/useApiQuery'
import { TicketType } from '@/types/ticket'
import { Boxes } from 'lucide-react'

export default function Page() {
  const { data: tickets } = useApiQuery<TicketType[]>('/tickets', [
    'tickets-ticket-page',
  ])
  return (
    <>
      <div className="mb-4 flex items-center gap-2 font-semibold">
        <Boxes className="!h-[24px] !w-[24px] text-primary" />
        <h1 className="text-white ">All tickets</h1>
      </div>
      <div className="p-4 rounded-xl border-[2px] border-grey border-solid  bg-linear-to-b from-grad-grey-1 to-grad-grey-2">
        <div className="flex flex-col gap-2">
          {tickets?.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </>
  )
}
