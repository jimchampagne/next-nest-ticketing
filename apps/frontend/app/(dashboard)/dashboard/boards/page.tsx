import { fetchAction } from '@/app/actions/fetchAction'
import { BoardType } from '@/types/board'
import { Boxes } from 'lucide-react'

export default async function Page() {
  const boards = await fetchAction<BoardType[]>('/boards')
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
