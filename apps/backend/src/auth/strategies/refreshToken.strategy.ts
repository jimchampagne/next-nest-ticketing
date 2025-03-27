import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { AuthJwtPayload } from '../dto/auth.dto'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    const secret = process.env.JWT_REFRESH_SECRET
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not defined')
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Extract from Bearer token in Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),

        // Extract from refreshToken cookie
        (req: Request) => {
          const cookies = req.headers.cookie
          if (!cookies) return null

          const refreshToken = cookies.match(/refreshToken=([^;]+)/)
          if (refreshToken && refreshToken[1]) {
            return refreshToken[1]
          }
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
