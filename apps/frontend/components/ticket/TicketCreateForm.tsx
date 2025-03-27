'use client'

import { BtnPrimary } from '../ui/btn/BtnPrimary'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useApiMutation } from '@/lib/hooks/useApiMutation'
import { useModal } from '../ui/ModalContext'
import { useForm } from '@/lib/hooks/useForm'
import { ticketSchema } from '@/lib/zod/ticketSchema'

type Props = {
  boardId?: number
}

export function TicketCreateForm({ boardId }: Props) {
  const { closeModal } = useModal()
  const newTicket = useApiMutation('/tickets', [
    'projects-dashboard-page',
    'tickets-ticket-page',
  ])

  const { errors, handleSubmit, handleInputChange } = useForm(
    {
      title: '',
      description: '',
      status: 'To Do',
      priority: 'High',
    },
    ticketSchema,
    (data) => {
      newTicket.mutateAsync(
        { ...data, boardId },
        { onSuccess: () => closeModal() },
      )
    },
  )
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mb-4">
        <div className="form-group mb-4">
          <p className="text-sm mb-1">Ticket title</p>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter a title"
            onChange={handleInputChange}
          />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>
        <div className="form-group mb-4">
          <p className="text-sm mb-1">Description</p>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            onChange={handleInputChange}
          />
          {errors.description && (
            <div className="form-error">{errors.description}</div>
          )}
        </div>
        <div className="form-group mb-4">
          <p className="text-sm mb-1">Status</p>
          <select name="status" id="status" onChange={handleInputChange}>
            <option>To Do</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          {errors.status && <div className="form-error">{errors.status}</div>}
        </div>
        <div className="form-group mb-12">
          <p className="text-sm mb-1">Priority</p>
          <select name="priority" id="status" onChange={handleInputChange}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          {errors.priority && (
            <div className="form-error">{errors.priority}</div>
          )}
        </div>
        <BtnPrimary type="submit" className="w-full">
          {newTicket.isPending ? <LoadingSpinner is-small /> : <p>Create</p>}
        </BtnPrimary>
      </form>
    </>
  )
}
