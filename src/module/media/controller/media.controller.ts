import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { MediaService } from '../provider/media.service'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { MediaResponse } from 'src/response/media.response'

@ApiTags('Media')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'media',
  version: '1'
})
export class MediaController {
  constructor (private readonly mediaService: MediaService) {}

  @ApiOperation({
    summary: '미디어 파일 업로드'
  })
  @ApiOkResponse({
    description: '미디어 파일 업로드 성공',
    type: String
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile (@UploadedFile() file: Express.Multer.File) {
    return this.mediaService.uploadFileToS3(file)
  }
}
