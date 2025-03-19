import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'
import { TicketsService } from '@tickets/tickets.service'
import { Prisma } from '@prisma/client'
import { AccessTokenGuard } from '@/guards/accessToken.guard'
import { AuthenticatedRequest } from '@/auth/dto/auth.dto'
import { ModifyGuard } from '@/guards/modify.guard'
import { CreateTicketDto } from './dto/create-ticket.dto'

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @Body() requestBody: CreateTicketDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.ticketsService.create({
      title: requestBody.title,
      description: requestBody.description,
      status: requestBody.status,
      priority: requestBody.priority,
      user: {
        connect: {
          id: request.user.sub,
        },
      },
      board: {
        connect: {
          id: requestBody.boardId,
        },
      },
    })
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.ticketsService.findAll(request.user.sub)
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.ticketsService.findOne(+id, request.user.sub)
  }

  @UseGuards(AccessTokenGuard, ModifyGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: Prisma.TicketUpdateInput,
  ) {
    return this.ticketsService.update(+id, updateTicketDto)
  }

  @UseGuards(AccessTokenGuard, ModifyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id)
  }
}
