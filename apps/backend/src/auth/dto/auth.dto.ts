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
  refreshToken: string
}

export interface AuthenticatedRequest extends Request {
  user: AuthJwtPayload
}
