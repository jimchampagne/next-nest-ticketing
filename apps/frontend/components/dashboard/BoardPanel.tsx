import { TicketItem } from '@/components/dashboard/TicketItem'
import { BoardType } from '@custom-types/board'
import { ClipboardList } from 'lucide-react'

export function BoardPanel({
  className,
  boards,
}: Readonly<{
  className?: string
  boards?: BoardType[] | null
}>) {
  return (
    <>
      {boards?.map((board) => (
        <div
          key={board.id}
          className={`${className} min-w-sm p-4 rounded-xl border-[2px] border-grey border-solid  bg-linear-to-b from-grad-grey-1 to-grad-grey-2`}
        >
          <h3 className="mb-4 text-white w-full font-semibold flex gap-2">
            <ClipboardList
              name="lucide:clipboard-list"
              className="text-primary"
            />
            {board.title}
          </h3>
          <div className="flex flex-col gap-2 overflow-auto rounded-md pr-[10px]">
            <TicketItem tickets={board.tickets} />
          </div>
        </div>
      ))}
    </>
  )
}
