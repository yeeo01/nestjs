import { ApiProperty } from '@nestjs/swagger'
import { UserResponse } from './user.response'
import { User } from 'src/entity/user.entity'

export class LoginResponse {
  @ApiProperty({
    example: 'exampletokenvalue'
  })
    accessToken: string

  @ApiProperty({
    example: 'exampletokenvalue'
  })
    refreshToken: string

  @ApiProperty({
    type: UserResponse
  })
    user: UserResponse
}

export const convertLoginResponse = (
  accessToken: string,
  refreshToken: string,
  user: User
): LoginResponse => {
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: {
      id: user.id,
      signinId: user.signinId,
      name: user.name || null,
      email: user.email || null,
      phoneNumber: user.phoneNumber || null,
      gender: user.gender || null
    }
  }
}
