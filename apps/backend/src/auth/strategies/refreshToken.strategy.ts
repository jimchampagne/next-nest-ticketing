import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt'
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
    const options: StrategyOptionsWithRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      passReqToCallback: true,
    }

    super(options)
  }

  validate(req: Request, payload: AuthJwtPayload) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim()
    if (!refreshToken) {
      throw new Error('Refresh token not found')
    }
    return { ...payload, refreshToken }
  }
}
