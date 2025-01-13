import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserRepository } from 'src/repository/user.repository'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './provider/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard]
})
export class AuthModule {}
