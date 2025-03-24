'use client'

import React, { useRef } from 'react'
import { BtnPrimary } from '../ui/btn/BtnPrimary'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useApiMutation } from '@/lib/hooks/useApiMutation'
import { useModal } from '../ui/ModalContext'

type Props = {
  boardId?: number
}

export function TicketCreateForm({ boardId }: Props) {
  const { closeModal } = useModal()
  const formRef = useRef<HTMLFormElement>(null)
  const createNewTicket = useApiMutation('/tickets', [
    'projects-dashboard-page',
  ])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    createNewTicket.mutate(
      {
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status'),
        boardId,
      },
      {
        onSuccess: () => {
          closeModal()
        },
      },
    )
  }
  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="w-full mb-4">
        <div className="form-group mb-4">
          <p className="text-sm mb-1">Ticket title</p>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter a title"
            required
          />
        </div>
        <div className="form-group mb-4">
          <p className="text-sm mb-1">Description</p>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            required
          />
        </div>
        <div className="form-group mb-12">
          <p className="text-sm mb-1">Status</p>
          <select name="status" id="status">
            <option>In Progress</option>
            <option>To Do</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
        <BtnPrimary type="submit" className="w-full">
          {createNewTicket.isPending ? (
            <LoadingSpinner is-small />
          ) : (
            <p>Create ticket</p>
          )}
        </BtnPrimary>
      </form>
    </>
  )
}
