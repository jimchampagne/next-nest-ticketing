import { fetchAction } from '@/app/actions/fetchAction'
import { TicketType } from '@/types/ticket'
import { Boxes } from 'lucide-react'

export default async function Page() {
  const tickets = await fetchAction<TicketType[]>('/tickets')
  return (
    <>
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <Boxes className="!h-[24px] !w-[24px] text-primary" />
        <h1 className="text-white ">Tickets Data</h1>
      </div>
      <pre>{JSON.stringify(tickets, null, 2)}</pre>
    </>
  )
}
