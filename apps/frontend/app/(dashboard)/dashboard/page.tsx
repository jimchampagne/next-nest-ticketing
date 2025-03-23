'use client'
import { ProjectPanel } from '@/components/dashboard/ProjectPanel'
import { useApiQuery } from '@/lib/hooks/useApiQuery'
import { ProjectType } from '@/types/project'

export default function Page() {
  const { data: projects } = useApiQuery<ProjectType[]>('/projects/all', [
    'projects-dashboard-page',
  ])
  return (
    <div>
      <ProjectPanel projects={projects} />
    </div>
  )
}
