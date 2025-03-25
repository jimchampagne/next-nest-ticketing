'use client'
import { BoardCard } from '@/components/board/BoardCard'
import { useApiQuery } from '@/lib/hooks/useApiQuery'
import { BoardType } from '@/types/board'
import { Boxes } from 'lucide-react'

export default function Page() {
  const { data: boards } = useApiQuery<BoardType[]>('/boards', [
    'boards-board-page',
  ])
  return (
    <>
      <div className="mb-4 flex items-center gap-2 font-semibold">
        <Boxes className="!h-[24px] !w-[24px] text-primary" />
        <h1 className="text-white ">All boards</h1>
      </div>
      <div className="p-4 rounded-xl border-[2px] border-grey border-solid  bg-linear-to-b from-grad-grey-1 to-grad-grey-2">
        <div className="flex flex-col gap-2">
          {boards?.map((board) => <BoardCard key={board.id} board={board} />)}
        </div>
      </div>
    </>
  )
}
