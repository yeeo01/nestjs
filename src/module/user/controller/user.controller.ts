import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { Controller, Get, Query } from '@nestjs/common'
import { UserService } from '../provider/user.service'
import { UserResponse } from 'src/responser/user.response'
import { InsufficientScope } from 'src/type/error/Common'

@ApiTags('User')
@ApiBearerAuth()
@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor (private readonly userService: UserService) {}

  @ApiOperation({
    summary: '내 정보'
  })
  @ApiOkResponse({
    description: 'User Info',
    type: UserResponse
  })
  @Get()
  getUserController (@Query('userId') userId: number) {
    if (!userId) {
      throw InsufficientScope
    }

    return this.userService.getUser(userId)
  }
}
