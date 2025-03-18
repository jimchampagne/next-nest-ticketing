import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from '@database/database.service'

@Injectable()
export class TicketsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createTicketDto: Prisma.TicketCreateInput) {
    return this.databaseService.ticket.create({ data: createTicketDto })
  }

  async findAll() {
    return this.databaseService.ticket.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.ticket.findUnique({ where: { id } })
  }

  async update(id: number, updateTicketDto: Prisma.TicketUpdateInput) {
    return this.databaseService.ticket.update({
      where: { id },
      data: updateTicketDto,
    })
  }

  async remove(id: number) {
    return this.databaseService.ticket.delete({ where: { id } })
  }
}
