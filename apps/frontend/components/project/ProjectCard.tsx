import { ProjectType } from '@/types/project'

export function ProjectCard({
  className,
  project,
}: Readonly<{
  className?: string
  project: ProjectType | null
}>) {
  return (
    <div className={`${className} w-full p-2 horizontal-card`}>
      <div>{project?.title}</div>
    </div>
  )
}
