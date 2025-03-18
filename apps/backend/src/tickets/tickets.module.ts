import { Module } from '@nestjs/common'
import { TicketsService } from '@tickets/tickets.service'
import { TicketsController } from '@tickets/tickets.controller'
import { DatabaseModule } from '@database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [],
})
export class TicketsModule {}
