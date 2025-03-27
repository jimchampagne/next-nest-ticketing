import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from '@auth/auth.service'
import { AuthenticatedRequest, AuthLoginDto } from '@auth/dto/auth.dto'
import { Prisma } from '@prisma/client'
import { RefreshTokenGuard } from '@/guards/refreshToken.guard'
import { Response } from 'express'
import { AccessTokenGuard } from '@/guards/accessToken.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signup(
    @Body() createUserDto: Prisma.UserCreateInput,
    @Res() response: Response,
  ) {
    const user = await this.authService.register(createUserDto)

    response.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
      maxAge: user.expiresAt,
    })

    response.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    })

    return response.status(200).json({
      user: {
        id: user.user.id,
        email: user.user.email,
        name: user.user.name,
      },
      issuedAt: user.issuedAt,
      expiresAt: user.expiresAt,
    })
  }

  @Post('login')
  async signin(@Body() data: AuthLoginDto, @Res() response: Response) {
    const user = await this.authService.login(data)

    response.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
      maxAge: user.expiresAt,
    })

    response.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    })

    return response.status(200).json({
      user: {
        id: user.user.id,
        email: user.user.email,
        name: user.user.name,
      },
      issuedAt: user.issuedAt,
      expiresAt: user.expiresAt,
    })
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshTokens(
    @Req() request: AuthenticatedRequest,
    @Res() response: Response,
  ) {
    const userId = request.user.sub
    const cookies = request.headers.cookie
    const refreshToken = cookies?.match(/refreshToken=([^;]+)/)?.[1]
    if (refreshToken) {
      const newTokens = await this.authService.refreshTokens(
        userId,
        refreshToken,
      )

      response.cookie('accessToken', newTokens.accessToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
        maxAge: newTokens.expiresAt,
      })

      response.cookie('refreshToken', newTokens.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
      })

      return response.status(200).json({ message: 'Tokens refreshed' })
    } else {
      return response.status(401).json({ message: 'Unauthorized' })
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(
    @Req() request: AuthenticatedRequest,
    @Res() response: Response,
  ) {
    const userId = request.user.sub

    await this.authService.logout(userId)

    response.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    })

    response.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    })

    return response.status(200).json({ message: 'Logged out successfully' })
  }
}
