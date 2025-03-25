'use client'

import { BtnPrimary } from '../ui/btn/BtnPrimary'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useApiMutation } from '@/lib/hooks/useApiMutation'
import { useModal } from '../ui/ModalContext'
import { useForm } from '@/lib/hooks/useForm'
import { ticketSchema } from '@/lib/zod/ticketSchema'
import { TicketType } from '@/types/ticket'

type Props = {
  ticket: TicketType
}

export function TicketUpdateForm({ ticket }: Props) {
  const { closeModal } = useModal()
  const updateTicket = useApiMutation(
    `/tickets/${ticket.id}`,
    ['projects-dashboard-page'],
    {
      method: 'PATCH',
    },
  )

  const { errors, handleSubmit, handleInputChange } = useForm(
    {
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    },
    ticketSchema,
    (data) => {
      updateTicket.mutate({ ...data }, { onSuccess: () => closeModal() })
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
            defaultValue={ticket.title}
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
            defaultValue={ticket.description}
          />
          {errors.description && (
            <div className="form-error">{errors.description}</div>
          )}
        </div>
        <div className="form-group mb-4">
          <p className="text-sm mb-1">Status</p>
          <select
            name="status"
            id="status"
            onChange={handleInputChange}
            defaultValue={ticket.status}
          >
            <option>To Do</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          {errors.status && <div className="form-error">{errors.status}</div>}
        </div>
        <div className="form-group mb-12">
          <p className="text-sm mb-1">Priority</p>
          <select
            name="priority"
            id="status"
            onChange={handleInputChange}
            defaultValue={ticket.priority}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          {errors.priority && (
            <div className="form-error">{errors.priority}</div>
          )}
        </div>
        <BtnPrimary type="submit" className="w-full">
          {updateTicket.isPending ? <LoadingSpinner is-small /> : <p>Update</p>}
        </BtnPrimary>
      </form>
    </>
  )
}
