export class CreateTicketDto {
  title: string
  description?: string | null | undefined
  status?: string | undefined
  priority?: string | undefined
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  boardId: number
}
