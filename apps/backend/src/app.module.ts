import { Module } from '@nestjs/common'
import { DatabaseModule } from '@database/database.module'
import { UsersModule } from '@users/users.module'
import { BoardsModule } from '@boards/boards.module'
import { TicketsModule } from '@tickets/tickets.module'
import { ProjectsModule } from '@projects/projects.module'
import { AuthModule } from '@auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    ProjectsModule,
    BoardsModule,
    TicketsModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AppModule {}
