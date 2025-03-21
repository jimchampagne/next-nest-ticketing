"use client"
import { useApiQuery } from '@/lib/hooks/useApiQuery'
import { TicketType } from '@/types/ticket'
import { Boxes } from 'lucide-react'

export default function Page() {
  const { data } = useApiQuery<TicketType[]>(
    '/tickets',
    ['tickets-ticket-page']
  )
  return (
    <>
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <Boxes className="!h-[24px] !w-[24px] text-primary" />
        <h1 className="text-white ">Tickets Data</h1>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
