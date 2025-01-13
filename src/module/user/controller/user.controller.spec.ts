import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from '../user.module'
import { UserController } from './user.controller'
import { UserRepository } from 'src/repository/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { db } from 'src/config/db.config'

describe('UserController', () => {
  let app: TestingModule
  let userController: UserController
  let userRepository: UserRepository

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true
        }),
        TypeOrmModule.forRootAsync(db([process.env.PWD ?? '', '/src'])),
        UserModule
      ]
    }).compile()

    userController = app.get<UserController>(UserController)
    userRepository = app.get<UserRepository>(UserRepository)
  })

  /**
   * 내 정보 조회
   */
  it('/GET /v1/user', async () => {
    const testUserId = 1

    // 컨트롤러 호출
    const result = await userController.getUserController(testUserId)

    // 결과가 정의되어 있는지 검증
    expect(result).toBeDefined()
    expect(result.id).toEqual(testUserId)
  })

  afterAll(async () => {
    await app.close()
  })
})
