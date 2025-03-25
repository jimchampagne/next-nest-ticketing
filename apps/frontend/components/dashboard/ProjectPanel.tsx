import { BoardPanel } from '@/components/dashboard/BoardPanel'
import { ProjectType } from '@custom-types/project'
import { Boxes, PlusIcon } from 'lucide-react'
import { useModal } from '../ui/ModalContext'
import { BtnIcon } from '../ui/btn/BtnIcon'
import { BoardCreateForm } from '../board/BoardCreateForm'

type Props = {
  className?: string
  projects?: ProjectType[] | null
}

export function ProjectPanel({ className, projects }: Props) {
  const { openModal } = useModal()
  return (
    <>
      {projects?.map((project) => (
        <div key={project.id} className={`${className} mb-12 relative`}>
          <div>
            <div className="flex items-center gap-2 mb-2 ">
              <div className="flex items-center gap-2 font-semibold">
                <Boxes className="!h-[24px] !w-[24px] text-primary" />
                <h1 className="text-white ">{project.title}</h1>
              </div>
              <BtnIcon
                className="relative top-[1px]"
                onClick={() =>
                  openModal(
                    'Create new board',
                    <BoardCreateForm projectId={project.id} />,
                  )
                }
              >
                <PlusIcon className="text-white w-5 h-5"></PlusIcon>
              </BtnIcon>
            </div>
          </div>
          <div className="flex flex-col gap-6 overflow-auto rounded-xl py-4">
            <BoardPanel boards={project.boards} />
          </div>
        </div>
      ))}
    </>
  )
}
