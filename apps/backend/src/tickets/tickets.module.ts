import { Module } from '@nestjs/common'
import { TicketsService } from '@tickets/tickets.service'
import { TicketsController } from '@tickets/tickets.controller'
import { DatabaseModule } from '@database/database.module'
import { ProjectsService } from '@/projects/projects.service'
import { BoardsService } from '@/boards/boards.service'

@Module({
  imports: [DatabaseModule],
  providers: [TicketsService, ProjectsService, BoardsService],
  controllers: [TicketsController],
  exports: [],
})
export class TicketsModule {}
