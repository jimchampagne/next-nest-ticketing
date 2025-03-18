export class AuthSignIn {
  email: string
  password: string
}

export class AuthValidateResult {
  userId: number
  email: string
}

export class AuthLoginResult {
  accessToken: string
}

export class AuthJwtPayload {
  sub: number
  email: string
}
