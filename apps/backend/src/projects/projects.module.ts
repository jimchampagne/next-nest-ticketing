import { Module } from '@nestjs/common'
import { ProjectsService } from '@projects/projects.service'
import { ProjectsController } from '@projects/projects.controller'
import { DatabaseModule } from '@database/database.module'
import { BoardsService } from '@/boards/boards.service'
import { TicketsService } from '@/tickets/tickets.service'

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, BoardsService, TicketsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
