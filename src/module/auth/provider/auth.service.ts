import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/repository/user.repository'
import { SignupBodyDto } from '../dto/signup.dto'
import { Connection } from 'typeorm'
import { convertUserResponse, UserResponse } from 'src/responser/user.response'

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
      const user = await manager
        .getCustomRepository(UserRepository)
        .signUp(body)

      return user
    })

    return convertUserResponse(user)
  }
}
