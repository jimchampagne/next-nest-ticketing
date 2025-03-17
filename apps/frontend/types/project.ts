import { BoardType } from '@custom-types/board'

export interface ProjectType {
  id: number
  user_id: number
  title: string
  description: string
  start_date: Date
  end_date: Date
  status: string
  created_at: Date
  updated_at: Date
  boards: BoardType[]
}
