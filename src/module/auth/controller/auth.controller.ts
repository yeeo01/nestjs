import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from '../provider/auth.service'
import { SignupBodyDto } from '../dto/signup.dto'
import { UserResponse } from 'src/response/user.response'
import { LoginBodyDto } from '../dto/login.dto'
import { LoginResponse } from 'src/response/login.response'

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiOperation({
    summary: '회원가입'
  })
  @ApiOkResponse({
    description: 'signup success',
    type: UserResponse
  })
  @Post('/signup')
  @HttpCode(201)
  postSignupController (@Body() body: SignupBodyDto) {
    return this.authService.signUp(body)
  }

  @ApiOperation({
    summary: '로그인'
  })
  @ApiOkResponse({
    description: 'login success',
    type: LoginResponse
  })
  @Post('/login')
  @HttpCode(200)
  postLoginController (@Body() body: LoginBodyDto) {
    return this.authService.login(body)
  }
}
