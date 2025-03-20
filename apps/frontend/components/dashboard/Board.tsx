import { Ticket } from '@components/dashboard/Ticket'
import { BoardType } from '@custom-types/board'

export function Board({
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
          className={`${className} min-w-sm p-6 rounded-xl border-[2px] border-grey border-solid hover:border-primary transition
        duration-250 bg-linear-to-b from-grad-grey-1 to-grad-grey-2`}
        >
          <h2 className="mb-4 text-white w-full font-semibold">
            {board.title}
          </h2>
          <div className="flex flex-col gap-2 overflow-auto rounded-md min-h-[520px] h-[520px] pr-[10px]">
            <Ticket tickets={board.tickets} />
          </div>
        </div>
      ))}
      {/* spacer for gradient */}
      <div className="p-[50px] h-full" />
    </>
  )
}
