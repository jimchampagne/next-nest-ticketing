'use client'

import { BtnPrimary } from '../ui/btn/BtnPrimary'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useApiMutation } from '@/lib/hooks/useApiMutation'
import { useModal } from '../ui/ModalContext'
import { BoardType } from '@/types/board'
import React, { useState } from 'react'

type Props = {
  board: BoardType
}

export function BoardDeleteForm({ board }: Props) {
  const { closeModal } = useModal()
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setDeleteConfirm(e.target.checked)
  }

  const deleteBoard = useApiMutation(
    `/boards/${board.id}`,
    ['projects-dashboard-page', 'boards-board-page'],
    {
      method: 'DELETE',
    },
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    deleteBoard.mutate(
      {},
      {
        onSuccess: () => closeModal(),
      },
    )
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mb-4">
        <div className="form-group mb-2">
          <p className="text-sm font-semibold text-red max-w-[50ch]">
            Are you sure you want to delete this board and all the tickets
            associated with this projects board?
          </p>
        </div>
        <div className="flex items-center gap-1 mb-4">
          <input
            id="deleteConfirm"
            type="checkbox"
            name="deleteConfirm"
            checked={deleteConfirm}
            onChange={handleCheckbox}
          />
          <label className="text-sm" htmlFor="deleteConfirm">
            Yes, I want to delete this board and all tickets associated.
          </label>
        </div>
        <BtnPrimary disabled={!deleteConfirm} type="submit" className="w-full">
          {deleteBoard.isPending ? <LoadingSpinner is-small /> : <p>Delete</p>}
        </BtnPrimary>
      </form>
    </>
  )
}
