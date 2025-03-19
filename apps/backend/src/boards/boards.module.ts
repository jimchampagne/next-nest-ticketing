import { Module } from '@nestjs/common'
import { BoardsService } from '@boards/boards.service'
import { BoardsController } from '@boards/boards.controller'
import { DatabaseModule } from '@database/database.module'
import { TicketsService } from '@/tickets/tickets.service'
import { ProjectsService } from '@/projects/projects.service'

@Module({
  imports: [DatabaseModule],
  providers: [BoardsService, TicketsService, ProjectsService],
  controllers: [BoardsController],
  exports: [],
})
export class BoardsModule {}
