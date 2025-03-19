export class CreateBoardDto {
  title: string
  projectId: number
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
}
