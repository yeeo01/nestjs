import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/repository/user.repository'
import { SignupBodyDto } from '../dto/signup.dto'
import { Connection } from 'typeorm'
import { convertUserResponse, UserResponse } from 'src/response/user.response'
import { DuplicateIdError } from 'src/type/error/error'

@Injectable()
export class AuthService {
  constructor (private readonly connection: Connection) {}

  /**
   * 회원가입
   * @param body `SignupBodyDto`
   * @returns `Promise<UserResponse>`
   */
  signUp = async (body: SignupBodyDto): Promise<UserResponse> => {
    const user = await this.connection.transaction(async (manager) => {
      // 아이디 중복 확인
      const existingUser = await manager
        .getCustomRepository(UserRepository)
        .findOne({ where: { signinId: body.signinId } })

      if (existingUser) {
        throw DuplicateIdError
      }

      const user = await manager
        .getCustomRepository(UserRepository)
        .signUp(body)

      return user
    })

    return convertUserResponse(user)
  }
}
