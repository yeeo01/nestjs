import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsString, Matches } from 'class-validator'
import { GenderType, TGenderType } from 'src/type/user/GenderType'
import { arrayToRegExp } from 'src/util/RegexUtil'

export class SignupBodyDto {
  @ApiProperty({
    type: String,
    example: 'yejin0417',
    description: '로그인 ID'
  })
  @IsString()
  @Matches(/^(?=.{4,16}$)([a-z])(?:[a-z0-9]+)?(?:[.]{1})?([a-z0-9])+$/)
  readonly signinId: string

  @ApiProperty({
    type: String,
    example: 'yejin0417',
    description: '비밀번호'
  })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)
  readonly password: string

  @ApiProperty({
    type: String,
    example: '박예진',
    description: '이름 '
  })
  @IsString()
  readonly name: string

  @ApiProperty({
    type: String,
    example: 'email@email.email',
    description: '이메일 '
  })
  @IsEmail()
  readonly email?: string

  @ApiProperty({
    type: String,
    example: '01012341234'
  })
  @IsString()
  @Transform(({ value }) => value.replace(/\s|-/gi, ''))
  readonly phoneNumber: string

  @ApiProperty({
    type: String,
    example: 'FEMALE',
    description: '성별',
    nullable: false
  })
  @Matches(arrayToRegExp(Object.values(GenderType)))
  @IsString()
  readonly gender: TGenderType
}
