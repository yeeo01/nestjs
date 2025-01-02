import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '../auth.module'
import { AuthController } from './auth.controller'
import { UserRepository } from 'src/repository/user.repository'
import { User } from 'src/entity/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SignupBodyDto } from '../dto/signup.dto'
import { db } from 'src/config/db.config'

describe('AuthController', () => {
  let app: TestingModule
  let authController: AuthController
  let userRepository: UserRepository

  let user: User

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true
        }),
        TypeOrmModule.forRootAsync(db([process.env.PWD ?? '', '/src'])),
        AuthModule
      ]
    }).compile()

    authController = app.get<AuthController>(AuthController)
    userRepository = app.get<UserRepository>(UserRepository)
  })

  /**
   * 회원가입
   */
  it('/POST /v1/signup', async () => {
    const body: SignupBodyDto = {
      signinId: 'test',
      password: 'test123',
      name: '회원가입 테스트',
      email: 'email@email.email',
      phoneNumber: '01012341234',
      gender: 'FEMALE'
    }

    const result = await authController.postSignupController(body)

    const createdUser = await userRepository.getUser(result.id)
    if (createdUser) {
      user = createdUser
    }

    // 사용자 정보 테스트
    expect(user).toBeDefined()
    expect(user.id).toEqual(result.id)
    expect(user.signinId).toEqual(body.signinId)

    // 로그인 정상 작동 테스트
    //
  })

  afterAll(async () => {
    // 생성된 데이터 제거
    await Promise.all([userRepository.delete(user.id)])

    await app.close()
  })
})
