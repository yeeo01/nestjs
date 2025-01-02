import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { db } from './config/db.config'
import { UserModule } from './module/user/user.module'
import { AuthModule } from './module/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(db([__dirname])),
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
