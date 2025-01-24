import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch (exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status: number
    let message: any

    // HttpException인 경우 처리
    if (exception instanceof HttpException) {
      status = exception.getStatus()
      message = exception.getResponse()
    } else {
      // 커스텀 에러 객체 처리
      status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR
      message = exception.message || 'Internal server error'
    }

    // exceptionResponse가 객체일 경우
    const finalMessage =
      typeof message === 'object' ? message : { message: message }

    response.status(status).json({
      statusCode: status,
      message: finalMessage.ko
    })
  }
}
