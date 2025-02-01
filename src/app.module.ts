import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { db } from './config/db.config'
import { UserModule } from './module/user/user.module'
import { AuthModule } from './module/auth/auth.module'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionsFilter } from './util/all-exceptions.filter'
import { MediaModule } from './module/media/media.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(db([__dirname])),
    AuthModule,
    UserModule,
    MediaModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
