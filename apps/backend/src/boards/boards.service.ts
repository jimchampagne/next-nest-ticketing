import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from '@database/database.service'

@Injectable()
export class BoardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBoardDto: Prisma.BoardCreateInput) {
    return this.databaseService.board.create({ data: createBoardDto })
  }

  async findAll(userId: number) {
    return this.databaseService.board.findMany({ where: { userId } })
  }

  async findOne(id: number, userId: number) {
    return this.databaseService.board.findUnique({ where: { id, userId } })
  }

  async update(id: number, updateBoardDto: Prisma.BoardUpdateInput) {
    return this.databaseService.board.update({
      where: { id },
      data: updateBoardDto,
    })
  }

  async remove(id: number) {
    return this.databaseService.board.delete({ where: { id } })
  }
}
