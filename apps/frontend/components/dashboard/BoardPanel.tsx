import { TicketItem } from '@/components/dashboard/TicketItem'
import { BoardType } from '@custom-types/board'
import { ClipboardList, Edit, PlusIcon, Trash2 } from 'lucide-react'
import { useModal } from '../ui/ModalContext'
import { TicketCreateForm } from '../ticket/TicketCreateForm'
import { BtnIcon } from '../ui/btn/BtnIcon'
import { BoardUpdateForm } from '../board/BoardUpdateForm'
import { BoardDeleteForm } from '../board/BoardDeleteForm'

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
            <div className="flex items-center gap-1 relative right-3">
              <BtnIcon
                onClick={() =>
                  openModal(
                    'Create new ticket',
                    <TicketCreateForm boardId={board.id} />,
                  )
                }
              >
                <PlusIcon className="text-white w-5 h-5"></PlusIcon>
              </BtnIcon>
              <BtnIcon
                onClick={() =>
                  openModal(
                    'Update board title',
                    <BoardUpdateForm board={board} />,
                  )
                }
              >
                <Edit className="text-white w-4 h-4" />
              </BtnIcon>

              <BtnIcon
                onClick={() =>
                  openModal(`Delete board`, <BoardDeleteForm board={board} />)
                }
              >
                <Trash2 className="text-white w-4 h-4"></Trash2>
              </BtnIcon>
            </div>
          </div>
          {board.tickets && board.tickets.length > 0 ? (
            <div className="flex flex-col gap-2 overflow-auto rounded-md pr-[10px]">
              <TicketItem tickets={board.tickets} />
            </div>
          ) : (
            <div>This board doesn&apos;t have tickets yet.</div>
          )}
        </div>
      ))}
    </>
  )
}
