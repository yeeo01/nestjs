import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator'
import { GenderType, TGenderType } from 'src/type/user/GenderType'
import { arrayToRegExp } from 'src/util/RegexUtil'

export class UpdateUserBodyDto {
  @ApiPropertyOptional({
    type: String,
    example: 'email@email.email',
    description: '이메일 '
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @ApiPropertyOptional({
    type: String,
    example: '01012341234'
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.replace(/\s|-/gi, ''))
  readonly phoneNumber: string

  @ApiPropertyOptional({
    type: String,
    example: 'FEMALE',
    description: '성별',
    nullable: false
  })
  @Matches(arrayToRegExp(Object.values(GenderType)))
  @IsString()
  readonly gender?: TGenderType
}
