'use client'
import { Boxes } from 'lucide-react'
import { useApiQuery } from '@/lib/hooks/useApiQuery'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectType } from '@/types/project'

export default function Page() {
  const { data: projects } = useApiQuery<ProjectType[]>('/projects', [
    'projects-project-page',
  ])
  return (
    <>
      <div className="mb-4 flex items-center gap-2 font-semibold">
        <Boxes className="!h-[24px] !w-[24px] text-primary" />
        <h1 className="text-white ">All projects</h1>
      </div>
      <div className="p-4 rounded-xl border-[2px] border-grey border-solid  bg-linear-to-b from-grad-grey-1 to-grad-grey-2">
        <div className="flex flex-col gap-2">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  )
}
