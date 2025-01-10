import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginBodyDto {
  @ApiProperty({
    example: 'yejin0417'
  })
  @IsString()
  readonly signinId: string

  @ApiProperty({
    example: 'yejin0417'
  })
  @IsString()
  readonly password: string
}
