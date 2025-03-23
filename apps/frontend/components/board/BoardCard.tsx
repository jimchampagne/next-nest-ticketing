import { BoardType } from '@/types/board'

export function BoardCard({
  className,
  board,
}: Readonly<{
  className?: string
  board: BoardType | null
}>) {
  return (
    <div className={`${className} w-full p-2 horizontal-card`}>
      <div>{board?.title}</div>
    </div>
  )
}
