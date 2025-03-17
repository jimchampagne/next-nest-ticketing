import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthJwtPayload, AuthSignIn } from './dto/auth.dto'
import { Public } from './auth.decorator'

export interface AuthenticatedRequest extends Request {
  user: AuthJwtPayload
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: AuthSignIn) {
    return this.authService.authenticate(input)
  }

  @Get('profile')
  getProfile(@Request() request: AuthenticatedRequest) {
    return request.user
  }
}
