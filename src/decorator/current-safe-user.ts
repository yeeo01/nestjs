import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'
import { InsufficientScope } from 'src/type/error/error'

const getCurrentSafeUserByContext = (context: ExecutionContext) => {
  const request: Request = context.switchToHttp().getRequest()

  if (!request.user?.userId) {
    throw InsufficientScope
  }

  return request.user.userId
}

export const CurrentSafeUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentSafeUserByContext(context)
)
