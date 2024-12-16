import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/repository/user.repository'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './provider/auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
