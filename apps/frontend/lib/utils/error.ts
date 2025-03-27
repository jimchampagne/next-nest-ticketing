export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class LoginError extends Error {
  constructor(message = 'Login error') {
    super(message)
    this.name = 'LoginError'
  }
}
