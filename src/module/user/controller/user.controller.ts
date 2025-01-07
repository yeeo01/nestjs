import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { UserService } from '../provider/user.service'
import { UserResponse } from 'src/responser/user.response'
import { InsufficientScope } from 'src/type/error/Common'
import { UpdateUserBodyDto } from '../dto/update-user.dto'

@ApiTags('User')
@ApiBearerAuth()
@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor (private readonly userService: UserService) {}

  @ApiOperation({
    summary: '유저 정보 조회'
  })
  @ApiOkResponse({
    description: 'User Info',
    type: UserResponse
  })
  @Get('/:userId')
  getUserController (@Param('userId') userId: number) {
    if (!userId) {
      throw InsufficientScope
    }

    return this.userService.getUser(userId)
  }

  @ApiOperation({
    summary: '유저 정보 수정'
  })
  @ApiOkResponse({
    description: 'User Info Update',
    type: UserResponse
  })
  @Patch('/:userId')
  patchUserController (
    @Param('userId') userId: number,
    @Body() body: UpdateUserBodyDto
  ) {
    if (!userId) {
      throw InsufficientScope
    }

    return this.userService.updateUser(userId, body)
  }
}
