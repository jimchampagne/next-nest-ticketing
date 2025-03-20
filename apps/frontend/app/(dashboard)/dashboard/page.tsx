import { fetchAction } from '@/app/actions/fetchAction'
import { Project } from '@/components/dashboard/Project'
import { ProjectType } from '@/types/project'

export default async function Page() {
  const projects = await fetchAction<ProjectType[]>('/projects/all')
  return (
    <div>
      <Project projects={projects} />
    </div>
  )
}
