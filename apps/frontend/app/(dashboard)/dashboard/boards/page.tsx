"use client"
import { useApiQuery } from '@/lib/hooks/useApiQuery'
import { BoardType } from '@/types/board'
import { Boxes } from 'lucide-react'

export default function Page() {
  const { data: boards } = useApiQuery<BoardType[]>(
      '/boards',
      ['boards-board-page']
    )
  return (
    <>
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <Boxes className="!h-[24px] !w-[24px] text-primary" />
        <h1 className="text-white ">Boards Data</h1>
      </div>
      <pre>{JSON.stringify(boards, null, 2)}</pre>
    </>
  )
}
