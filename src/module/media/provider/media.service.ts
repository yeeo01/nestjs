import { Injectable } from '@nestjs/common'
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import { ConfigService } from '@nestjs/config'
import { MediaResponse } from 'src/response/media.response'

@Injectable()
export class MediaService {
  private s3: S3Client

  constructor (private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
      }
    })
  }

  uploadFileToS3 = async (file: Express.Multer.File) => {
    const bucketName = this.configService.get('AWS_BUCKET_NAME')
    const fileKey = `uploads/${uuidv4()}${file.originalname.slice(file.originalname.lastIndexOf('.'))}`

    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype
    }

    try {
      const command = new PutObjectCommand(params)
      await this.s3.send(command)

      // return {
      //   url: `https://${bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileKey}`,
      //   size: file.size,
      //   type: file.mimetype
      // }\

      return 'ok'
    } catch (error) {
      console.error('파일 업로드 실패', error)
      throw new Error('파일 업로드에 실패했습니다.')
    }
  }
}
