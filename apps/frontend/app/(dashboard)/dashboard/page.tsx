"use client"
import { Project } from '@/components/dashboard/Project'
import { useApiQuery } from '@/lib/hooks/useApiQuery'
import { ProjectType } from '@/types/project'

export default function Page() {
  const { data: projects } = useApiQuery<ProjectType[]>(
    '/projects/all',
    ['projects-dashboard-page']
  )
  return (
    <div>
      <Project projects={projects} />
    </div>
  )
}
