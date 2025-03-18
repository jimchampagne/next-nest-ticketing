import { Board } from "@components/dashboard/Board"
import { ProjectType } from "@custom-types/project"
import { Boxes } from "lucide-react"

export function Project({
  className,
  projects,
}: Readonly<{
  className?: string
  projects?: ProjectType[] | null
}>) {
  return (
    <>
      {projects?.map((project) => (
        <div key={project.id} className={`${className} mb-16 relative`}>
        <div className="absolute right-0 top-0 w-[50px] sm:w-[100px] h-full bg-linear-to-l from-dark to-transparent" />
        <div className="mb-2 flex items-center gap-2 font-semibold">
          <Boxes className="!h-[24px] !w-[24px]" />
          <h1 className="text-white ">
            {project.title}
          </h1>
        </div>
        <div className="flex gap-4 overflow-x-scroll rounded-xl py-4">
          <Board />
        </div>
      </div>
      ))}
    </>
  )
}
