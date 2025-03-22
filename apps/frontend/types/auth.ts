export interface JWT {
  user: {
    id: number
    email: string
    name: string
  }
  accessToken: string
  refreshToken: string
  issuedAt: number
  expiresAt: number
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
  issuedAt: number
  expiresAt: number
}
