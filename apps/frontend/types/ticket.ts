export interface TicketType {
  id: number
  board_id: number
  title: string
  description: string
  status?: string
  priority?: string
  created_at?: Date
  updated_at?: Date
}
