import { TicketType } from '@custom-types/ticket'

export interface BoardType {
  id: number
  title: string
  project_id: number
  created_at: Date
  updated_at: Date
  tickets: TicketType[]
}
