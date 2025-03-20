import { fetchAction } from '@/app/actions/fetchAction'
import { Project } from 'next/dist/build/swc/types'
import { Boxes } from 'lucide-react'

export default async function Page() {
  const projects = await fetchAction<Project[]>('/projects')
  return (
    <>
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <Boxes className="!h-[24px] !w-[24px] text-primary" />
        <h1 className="text-white ">Projects Data</h1>
      </div>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </>
  )
}
