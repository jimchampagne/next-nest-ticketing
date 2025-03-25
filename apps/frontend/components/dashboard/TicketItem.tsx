import { TicketType } from '@custom-types/ticket'
import { TicketStatusIcon } from '../ui/ticket/TicketStatus'
import { useModal } from '../ui/ModalContext'
import { TicketUpdateForm } from '../ticket/TicketUpdateForm'

type Props = {
  className?: string
  tickets?: TicketType[] | null
}

export function TicketItem({ className, tickets }: Props) {
  const { openModal } = useModal()
  return (
    <>
      {tickets?.map((ticket) => (
        <div
          key={ticket.id}
          className={`${className} group/ticket rounded-md p-2.5 bg-grad-grey-2 shadow-xl border border-solid border-lightgrey text-white hover:text-dark hover:bg-primary ease-in-out duration-150 cursor-pointer`}
          onClick={() =>
            openModal(`${ticket.title}`, <TicketUpdateForm ticket={ticket} />)
          }
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
