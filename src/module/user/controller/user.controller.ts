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
import { ChangePasswordDto } from '../dto/change-password.dto'
import { CurrentSafeUser } from 'src/decorator/current-safe-user'

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
  @Get()
  getUserController (@CurrentSafeUser() userId: number) {
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
  @Patch()
  patchUserController (
    @CurrentSafeUser() userId: number,
    @Body() body: UpdateUserBodyDto
  ) {
    return this.userService.updateUser(userId, body)
  }

  @ApiOperation({
    summary: '비밀번호 변경'
  })
  @ApiOkResponse({
    description: 'Password changed successfully',
    type: String
  })
  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  changePasswordController (
    @CurrentSafeUser() userId: number,
    @Body() body: ChangePasswordDto
  ) {
    return this.userService.changePassword(userId, body)
  }
}
