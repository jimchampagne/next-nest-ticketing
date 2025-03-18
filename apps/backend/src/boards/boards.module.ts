import { Module } from '@nestjs/common'
import { BoardsService } from '@boards/boards.service'
import { BoardsController } from '@boards/boards.controller'
import { DatabaseModule } from '@database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
