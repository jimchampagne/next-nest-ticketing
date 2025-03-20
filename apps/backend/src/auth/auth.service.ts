import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { AuthLoginDto } from '@auth/dto/auth.dto'
import { UsersService } from '@users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as argon2 from 'argon2'
import { Prisma } from '@prisma/client'

const EXPIRE_TIME = 15 * 60 * 1000

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // REGISTERING A USER
  async register(registerDto: Prisma.UserCreateInput): Promise<any> {
    const userExists = await this.usersService.findByEmail(registerDto.email)
    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    const hash = await this.hashData(registerDto.password)
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hash,
    })

    const tokens = await this.getTokens(newUser.id, newUser.email)
    await this.updateRefreshToken(newUser.id, tokens.refreshToken)
    return tokens
  }

  // LOGGIN IN A USER
  async login(loginDto: AuthLoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email)
    if (!user) throw new BadRequestException('User does not exist')

    const passwordMatches = await argon2.verify(
      user.password,
      loginDto.password,
    )
    if (!passwordMatches) throw new BadRequestException('Password is incorrect')

    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      ...tokens,
      issuedAt: Date.now(),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    }
  }

  // LOGGING OUT A USER
  async logout(userId: number) {
    return this.usersService.update(userId, { refreshToken: null })
  }

  hashData(data: string) {
    return argon2.hash(data)
  }

  // UPDATE REFRESH TOKEN
  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    })
  }

  // GET TOKENS
  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findOne(userId)

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied')

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    )

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')
    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return {
      ...tokens,
      issuedAt: Date.now(),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    }
  }
}
