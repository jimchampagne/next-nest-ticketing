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
import { BoardsService } from '@boards/boards.service'
import { Prisma } from '@prisma/client'
import { AccessTokenGuard } from '@/common/guards/accessToken.guard'

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createBoardDto: Prisma.BoardCreateInput) {
    return this.boardsService.create(createBoardDto)
  }

  @Get()
  findAll() {
    return this.boardsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id)
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: Prisma.BoardUpdateInput,
  ) {
    return this.boardsService.update(+id, updateBoardDto)
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id)
  }
}
