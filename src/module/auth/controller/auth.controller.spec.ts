import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from '../auth.module'
import { AuthController } from './auth.controller'
import { UserRepository } from 'src/repository/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SignupBodyDto } from '../dto/signup.dto'
import { db } from 'src/config/db.config'
import { UserResponse } from 'src/response/user.response'

describe('AuthController', () => {
  let app: TestingModule
  let authController: AuthController
  let userRepository: UserRepository

  let user: UserResponse

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true
        }),
        TypeOrmModule.forRootAsync(db([__dirname])),
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
      signinId: `test-${Date.now()}`, // 고유한 signinId 사용
      password: 'test123',
      name: '회원가입 테스트',
      email: 'email@email.email',
      phoneNumber: '01012341234',
      gender: 'FEMALE'
    }

    // 컨트롤러 호출
    const result = await authController.postSignupController(body)

    // 요청한 바디 값대로 회원가입이 이루어졌는지 검증
    expect(result).toBeDefined()
    expect(result.signinId).toEqual(body.signinId)
    expect(result.name).toEqual(body.name)
    expect(result.email).toEqual(body.email)
    expect(result.phoneNumber).toEqual(body.phoneNumber)
    expect(result.gender).toEqual(body.gender)

    // user 변수에 결과 저장
    user = result
  })

  afterAll(async () => {
    // 생성된 데이터가 존재하는지 확인하고, 존재하면 삭제
    if (user && user.id) {
      await userRepository.softDelete(user.id)
    }
    await app.close()
  })
})
