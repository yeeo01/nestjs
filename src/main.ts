import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Yejin-Nest')
    .setDescription('Yejin-Nest-Learning')
    .addTag('User', '사용자')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
