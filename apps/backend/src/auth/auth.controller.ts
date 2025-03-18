import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from '@auth/auth.service'
import { AuthenticatedRequest, AuthLoginDto } from '@auth/dto/auth.dto'
import { Prisma } from '@prisma/client'
import { AccessTokenGuard } from '@/common/guards/accessToken.guard'
import { RefreshTokenGuard } from '@/common/guards/refreshToken.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  signup(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  signin(@Body() data: AuthLoginDto) {
    return this.authService.login(data)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: AuthenticatedRequest) {
    await this.authService.logout(req.user['sub'])
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: AuthenticatedRequest) {
    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
