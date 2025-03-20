import { TicketType } from '@custom-types/ticket'
import {
  GitPullRequest,
  CircleDashed,
  CircleX,
  CheckCheckIcon,
} from 'lucide-react'

export function Ticket({
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
          className={`${className} group/ticket rounded-md p-4 bg-grad-grey-2 shadow-xl border border-solid border-primary text-white hover:text-dark hover:bg-primary ease-in-out duration-150 cursor-pointer`}
        >
          <div className="flex items-start justify-between mb-2 gap-4">
            <p className="font-semibold text-[18px]">{ticket.title}</p>
            {ticket.status === 'In Progress' && (
              <GitPullRequest
                name="lucide:git-pull-request"
                className="!h-[24px] !w-[24px] text-primary group-hover/ticket:text-dark"
              />
            )}
            {ticket.status === 'To Do' && (
              <CircleDashed
                name="lucide:circle-dashed"
                className="!h-[24px] !w-[24px] text-yellow group-hover/ticket:text-yellow"
              />
            )}
            {ticket.status === 'Pending' && (
              <CircleX
                name="lucide:circle-x"
                className="!h-[24px] !w-[24px] text-red group-hover/ticket:text-red"
              />
            )}
            {ticket.status === 'Completed' && (
              <CheckCheckIcon
                name="lucide:circle-x"
                className="!h-[24px] !w-[24px] text-green group-hover/ticket:text-red"
              />
            )}
          </div>
          <div>
            <p className="text-[14px]">{ticket.description}</p>
          </div>
        </div>
      ))}
    </>
  )
}
