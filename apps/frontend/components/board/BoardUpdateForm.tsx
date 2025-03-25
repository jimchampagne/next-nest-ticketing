'use client'

import { BtnPrimary } from '../ui/btn/BtnPrimary'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useApiMutation } from '@/lib/hooks/useApiMutation'
import { useModal } from '../ui/ModalContext'
import { useForm } from '@/lib/hooks/useForm'
import { boardSchema } from '@/lib/zod/boardSchema'
import { BoardType } from '@/types/board'

type Props = {
  board: BoardType
}

export function BoardUpdateForm({ board }: Props) {
  const { closeModal } = useModal()
  const updateBoard = useApiMutation(
    `/boards/${board.id}`,
    ['projects-dashboard-page'],
    {
      method: 'PATCH',
    },
  )

  const { errors, handleSubmit, handleInputChange } = useForm(
    {
      title: '',
    },
    boardSchema,
    (data) => {
      updateBoard.mutate({ ...data }, { onSuccess: () => closeModal() })
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
            defaultValue={board.title}
          />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>
        <BtnPrimary type="submit" className="w-full">
          {updateBoard.isPending ? <LoadingSpinner is-small /> : <p>Update</p>}
        </BtnPrimary>
      </form>
    </>
  )
}
