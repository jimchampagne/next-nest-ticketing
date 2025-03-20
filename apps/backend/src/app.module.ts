import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { DatabaseModule } from '@database/database.module'
import { UsersModule } from '@users/users.module'
import { BoardsModule } from '@boards/boards.module'
import { TicketsModule } from '@tickets/tickets.module'
import { ProjectsModule } from '@projects/projects.module'
import { AuthModule } from '@auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from '@/middleware/logger.middleware'

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
