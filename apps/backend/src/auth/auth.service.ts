import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthSignIn, AuthValidateResult, AuthLoginResult } from './dto/auth.dto'
import { UsersService } from '@/users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthSignIn): Promise<AuthLoginResult | null> {
    const user = await this.validateUser(input)
    if (!user) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.userId, email: user.email }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async validateUser(input: AuthSignIn): Promise<AuthValidateResult | null> {
    const user = await this.usersService.findByEmail(input.email)
    if (user && user.password === input.password) {
      return {
        userId: user.id,
        email: user.email,
      }
    }
    return null
  }
}
