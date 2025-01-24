import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches
} from 'class-validator'

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    example: 'yejin0417',
    description: '비밀번호'
  })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)
  readonly oldPassword: string

  @ApiProperty({
    type: String,
    example: 'yejin0417',
    description: '비밀번호'
  })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)
  readonly newPassword: string

  @ApiProperty({
    type: String,
    example: 'yejin0417',
    description: '비밀번호'
  })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)
  readonly confirmPassword: string
}
