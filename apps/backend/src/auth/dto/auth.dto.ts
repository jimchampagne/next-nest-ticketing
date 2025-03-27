import { Request } from 'express'

export class AuthRegisterDto {
  name: string
  email: string
  password: string
  refreshToken: string
}

export class AuthLoginDto {
  email: string
  password: string
}

export class AuthJwtPayload {
  sub: number
  email: string
  iat: number
  exp: number
}

export interface AuthenticatedRequest extends Request {
  user: AuthJwtPayload
}
