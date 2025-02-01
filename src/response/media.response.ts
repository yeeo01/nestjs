import { ApiProperty } from '@nestjs/swagger'

export class MediaResponse {
  @ApiProperty({
    description: '파일 URL'
  })
    url: string

  @ApiProperty({
    description: '파일 크기',
    example: 12345
  })
    size: number

  @ApiProperty({
    description: '파일 타입',
    example: 'image/jpeg'
  })
    type: string
}
