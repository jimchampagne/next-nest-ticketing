import { TicketItem } from '@/components/dashboard/TicketItem'
import { BoardType } from '@custom-types/board'
import { ClipboardList, PlusIcon } from 'lucide-react'
import { useModal } from '../ui/ModalContext'
import { TicketCreateForm } from '../ticket/TicketCreateForm'
import { BtnIcon } from '../ui/btn/BtnIcon'

type Props = {
  className?: string
  boards?: BoardType[] | null
}

export function BoardPanel({ className, boards }: Props) {
  const { openModal } = useModal()
  return (
    <>
      {boards?.map((board) => (
        <div
          key={board.id}
          className={`${className} min-w-sm p-4 rounded-xl border-[2px] border-grey border-solid  bg-linear-to-b from-grad-grey-1 to-grad-grey-2`}
        >
          <div className="flex mb-4 pr-2 justify-between items-center">
            <h3 className=" text-white w-full font-semibold flex gap-2">
              <ClipboardList
                name="lucide:clipboard-list"
                className="text-primary"
              />
              {board.title}
            </h3>
            {/* Create new ticket button */}
            <BtnIcon
              className="relative right-2"
              onClick={() =>
                openModal(
                  'Create new ticket',
                  <TicketCreateForm boardId={board.id} />,
                )
              }
            >
              <PlusIcon className="text-white w-5 h-5"></PlusIcon>
            </BtnIcon>
          </div>
          <div className="flex flex-col gap-2 overflow-auto rounded-md pr-[10px]">
            <TicketItem tickets={board.tickets} />
          </div>
        </div>
      ))}
    </>
  )
}
