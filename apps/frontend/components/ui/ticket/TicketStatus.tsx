import {
  GitPullRequest,
  CircleDashed,
  CircleX,
  CheckCheckIcon,
} from 'lucide-react'

type Props = {
  ticketStatus: string | undefined
}

export function TicketStatusIcon({ ticketStatus }: Props) {
  if (ticketStatus === 'In Progress')
    return (
      <GitPullRequest
        name="lucide:git-pull-request"
        className="!h-[24px] !w-[24px] text-primary group-hover/ticket:text-dark"
      />
    )
  if (ticketStatus === 'To Do')
    return (
      <CircleDashed
        name="lucide:circle-dashed"
        className="!h-[24px] !w-[24px] text-yellow group-hover/ticket:text-yellow"
      />
    )
  if (ticketStatus === 'Pending')
    return (
      <CircleX
        name="lucide:circle-x"
        className="!h-[24px] !w-[24px] text-red group-hover/ticket:text-red"
      />
    )
  if (ticketStatus === 'Completed')
    return (
      <CheckCheckIcon
        name="lucide:circle-x"
        className="!h-[24px] !w-[24px] text-green group-hover/ticket:text-red"
      />
    )
  else return <></>
}
