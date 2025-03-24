import { BoardPanel } from '@/components/dashboard/BoardPanel'
import { ProjectType } from '@custom-types/project'
import { Boxes } from 'lucide-react'

export function ProjectPanel({
  className,
  projects,
}: Readonly<{
  className?: string
  projects?: ProjectType[] | null
}>) {
  return (
    <>
      {projects?.map((project) => (
        <div key={project.id} className={`${className} mb-12 relative`}>
          <div>
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <Boxes className="!h-[24px] !w-[24px] text-primary" />
              <h1 className="text-white ">{project.title}</h1>
            </div>
          </div>
          <div className="flex flex-col gap-6 overflow-auto rounded-xl py-4">
            <BoardPanel boards={project.boards} />
          </div>
        </div>
      ))}
    </>
  )
}
