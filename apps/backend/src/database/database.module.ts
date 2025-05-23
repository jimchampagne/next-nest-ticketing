import { Module } from '@nestjs/common'
import { DatabaseService } from '@database/database.service'

@Module({
  imports: [],
  providers: [DatabaseService],
  controllers: [],
  exports: [DatabaseService],
})
export class DatabaseModule {}
