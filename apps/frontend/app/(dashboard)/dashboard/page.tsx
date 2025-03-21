"use client"
import { Project } from '@/components/dashboard/Project'
import { useApiQuery } from '@/lib/hooks/useApiQuery'
import { ProjectType } from '@/types/project'

export default function Page() {
  const { data } = useApiQuery<ProjectType[]>(
    '/projects/all',
    ['all-projects']
  )
  return (
    <div>
      <Project projects={data} />
    </div>
  )
}
