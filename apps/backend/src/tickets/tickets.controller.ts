import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { TicketsService } from './tickets.service'
import { Prisma } from '@prisma/client'

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: Prisma.TicketCreateInput) {
    return this.ticketsService.create(createTicketDto)
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: Prisma.TicketUpdateInput,
  ) {
    return this.ticketsService.update(+id, updateTicketDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id)
  }
}
