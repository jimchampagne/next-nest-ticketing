import { Module } from '@nestjs/common'
import { AuthController } from '@auth/auth.controller'
import { AuthService } from '@auth/auth.service'
import { UsersModule } from '@users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenStrategy } from './strategies/accessToken.strategy'
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy'

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
