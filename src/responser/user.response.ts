import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { User } from 'src/entity/user.entity'

export class UserResponse {
  @ApiProperty({
    type: Number,
    example: 1
  })
    id: number

  @ApiProperty({
    type: String,
    example: 'user_signin_id'
  })
    signinId: string

  @ApiPropertyOptional({
    type: String,
    nullable: true,
    example: 'test user'
  })
    name: string | null

  @ApiPropertyOptional({
    type: String,
    nullable: true,
    example: 'user@example.com'
  })
    email: string | null

  @ApiPropertyOptional({
    type: String,
    nullable: true,
    example: '01012345678'
  })
    phoneNumber: string | null

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'Male'
  })
    gender: string | null
}

export const convertUserResponse = (user: User): UserResponse => {
  return {
    id: user.id,
    signinId: user.signinId,
    name: user.name || null,
    email: user.email || null,
    phoneNumber: user.phoneNumber || null,
    gender: user.gender || null
  }
}
