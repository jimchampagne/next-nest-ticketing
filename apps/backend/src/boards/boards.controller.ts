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
import { BoardsService } from '@boards/boards.service'
import { Prisma } from '@prisma/client'
import { AccessTokenGuard } from '@/guards/accessToken.guard'
import { AuthenticatedRequest } from '@/auth/dto/auth.dto'
import { ModifyGuard } from '@/guards/modify.guard'
import { CreateBoardDto } from './dto/create-board.dto'

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @Body() requestBody: CreateBoardDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.boardsService.create({
      title: requestBody.title,
      user: {
        connect: {
          id: request.user.sub,
        },
      },
      project: {
        connect: {
          id: requestBody.projectId,
        },
      },
    })
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.boardsService.findAll(request.user.sub)
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.boardsService.findOne(+id, request.user.sub)
  }

  @UseGuards(AccessTokenGuard, ModifyGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: Prisma.BoardUpdateInput,
  ) {
    return this.boardsService.update(+id, updateBoardDto)
  }

  @UseGuards(AccessTokenGuard, ModifyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id)
  }
}
