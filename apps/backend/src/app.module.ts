import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { BoardsModule } from './boards/boards.module'
import { TicketsModule } from './tickets/tickets.module'
import { ProjectsModule } from './projects/projects.module'

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ProjectsModule,
    BoardsModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
