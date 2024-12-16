import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from '../provider/auth.service'
import { SignupBodyDto } from '../dto/signup.dto'
import { UserResponse } from 'src/responser/user.response'

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
}
