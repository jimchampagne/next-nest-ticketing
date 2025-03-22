import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthJwtPayload } from '@auth/dto/auth.dto'
import { Request } from 'express'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secret = process.env.JWT_ACCESS_SECRET

    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not defined')
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => {
          const cookies = req.headers.cookie
          if (!cookies) return null

          const accessToken = cookies.match(/accessToken=([^;]+)/)
          if (accessToken) return accessToken[1]
          return null
        },
      ]),
      secretOrKey: secret,
    })
  }

  validate(payload: AuthJwtPayload) {
    return payload
  }
}
