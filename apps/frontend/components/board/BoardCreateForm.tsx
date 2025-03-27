'use client'

import { BtnPrimary } from '../ui/btn/BtnPrimary'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useApiMutation } from '@/lib/hooks/useApiMutation'
import { useModal } from '../ui/ModalContext'
import { useForm } from '@/lib/hooks/useForm'
import { boardSchema } from '@/lib/zod/boardSchema'

type Props = {
  projectId?: number
}

export function BoardCreateForm({ projectId }: Props) {
  const { closeModal } = useModal()
  const newBoard = useApiMutation('/boards', [
    'projects-dashboard-page',
    'boards-board-page',
  ])

  const { errors, handleSubmit, handleInputChange } = useForm(
    {
      title: '',
    },
    boardSchema,
    (data) => {
      newBoard.mutateAsync(
        { ...data, projectId },
        { onSuccess: () => closeModal() },
      )
    },
  )
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mb-4">
        <div className="form-group mb-8">
          <p className="text-sm mb-1">Board title</p>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter a board title"
            onChange={handleInputChange}
          />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>
        <BtnPrimary type="submit" className="w-full">
          {newBoard.isPending ? <LoadingSpinner is-small /> : <p>Create</p>}
        </BtnPrimary>
      </form>
    </>
  )
}
