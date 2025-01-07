import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  // 글로벌 유효성 검사 파이프 추가
  app.useGlobalPipes(new ValidationPipe())

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Yejin-Nest')
    .setDescription('Yejin-Nest-Learning')
    .addTag('Auth', '인증')
    .addTag('User', '사용자')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Yejin Custom Swagger'
  })

  await app.listen(3000)
}
bootstrap()
