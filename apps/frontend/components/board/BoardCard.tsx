import { BoardType } from '@/types/board'

export function BoardCard({
  className,
  board,
}: Readonly<{
  className?: string
  board: BoardType | null
}>) {
  return (
    <div
      className={`${className} rounded-md p-2.5 bg-grad-grey-2 shadow-xl border border-solid border-lightgrey text-white hover:text-dark hover:bg-primary ease-in-out duration-150 cursor-pointer`}
    >
      <div>{board?.title}</div>
    </div>
  )
}
