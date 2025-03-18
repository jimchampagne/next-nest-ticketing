import { Module } from '@nestjs/common'
import { UsersService } from '@users/users.service'
import { UsersController } from '@users/users.controller'
import { DatabaseModule } from '@database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
