import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common'
import { UserService } from '../provider/user.service'
import { UserResponse } from 'src/response/user.response'
import { InsufficientScope } from 'src/type/error/error'
import { UpdateUserBodyDto } from '../dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport'

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
  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId')
  getUserController (@Req() req) {
    const userId = req.user.userId

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
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:userId')
  patchUserController (@Req() req, @Body() body: UpdateUserBodyDto) {
    const userId = req.user.userId

    if (!userId) {
      throw InsufficientScope
    }

    return this.userService.updateUser(userId, body)
  }
}
