import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { TicketsService } from '@tickets/tickets.service'
import { Prisma } from '@prisma/client'
import { AccessTokenGuard } from '@/common/guards/accessToken.guard'

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AccessTokenGuard)
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

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: Prisma.TicketUpdateInput,
  ) {
    return this.ticketsService.update(+id, updateTicketDto)
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id)
  }
}
