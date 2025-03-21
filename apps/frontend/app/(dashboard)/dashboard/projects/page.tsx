"use client"
import { Project } from 'next/dist/build/swc/types'
import { Boxes } from 'lucide-react'
import { useApiQuery } from '@/lib/hooks/useApiQuery'

export default function Page() {
  const { data } = useApiQuery<Project[]>(
        '/projects',
        ['projects-project-page']
      )
  return (
    <>
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <Boxes className="!h-[24px] !w-[24px] text-primary" />
        <h1 className="text-white ">Projects Data</h1>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
