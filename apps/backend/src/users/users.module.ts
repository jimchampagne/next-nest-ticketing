import { Module } from '@nestjs/common'
import { UsersService } from '@users/users.service'
import { UsersController } from '@users/users.controller'
import { DatabaseModule } from '@database/database.module'
import { ProjectsService } from '@/projects/projects.service'
import { BoardsService } from '@/boards/boards.service'
import { TicketsService } from '@/tickets/tickets.service'

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ProjectsService, BoardsService, TicketsService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
