// Set the allowed origins
const allowedOrigins: string[] = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
]

// Configure CORS OPTIONS
export const corsOptions = {
  origin: function (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}
