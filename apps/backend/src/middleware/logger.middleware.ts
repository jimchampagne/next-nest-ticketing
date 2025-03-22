import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('-----------------------------------------')
    console.log(`Request: ${req.method} ${req.originalUrl}`)
    // console.log('Headers:', req.headers)
    // console.log('Body:', req.body)

    // Create a custom response wrapper to capture response data
    const originalSend = res.send
    res.send = (body: any) => {
      console.log('Response Status', res.statusCode)
      // console.log('ResBody:', body) // Log the response body
      return originalSend.call(res, body) // Proceed with sending the response
    }

    next() // Continue to the next middleware or route handler
  }
}
