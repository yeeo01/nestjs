import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MediaController } from './controller/media.controller'
import { MediaService } from './provider/media.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
