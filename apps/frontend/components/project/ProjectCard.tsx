import { ProjectType } from '@/types/project'

export function ProjectCard({
  className,
  project,
}: Readonly<{
  className?: string
  project: ProjectType | null
}>) {
  return (
    <div
      className={`${className} rounded-md p-2.5 bg-grad-grey-2 shadow-xl border border-solid border-lightgrey text-white hover:text-dark hover:bg-primary ease-in-out duration-150 cursor-pointer`}
    >
      <div>{project?.title}</div>
    </div>
  )
}
