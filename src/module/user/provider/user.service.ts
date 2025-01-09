import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from 'src/repository/user.repository' // 수정
import { UserResponse, convertUserResponse } from 'src/response/user.response'
import { NoDataError } from 'src/type/error/error'
import { UpdateUserBodyDto } from '../dto/update-user.dto'
import { Connection } from 'typeorm'
import { User } from 'src/entity/user.entity'

@Injectable()
export class UserService {
  constructor (
    private readonly connection: Connection,
    private readonly userRepository: UserRepository
  ) {}

  /**
   * 유저 정보 조회
   * @param userId `number`
   * @returns `Promise<UserResponse>s`
   */
  getUser = async (id: number): Promise<UserResponse> => {
    const user = await this.userRepository.getUser(id)

    if (!user) {
      throw NoDataError
    }

    return convertUserResponse(user)
  }

  /**
   * 유저 정보 수정
   * @param id `number`
   * @param body `UpdateUserBodyDto`
   * @returns `Promise<UserResponse>`
   */
  updateUser = async (
    id: number,
    body: UpdateUserBodyDto
  ): Promise<UserResponse> => {
    const updateUser = await this.connection.transaction(async (manager) => {
      const userRepository = manager.getCustomRepository(UserRepository)

      // update
      const user = await userRepository.updateUser(id, body)

      return user
    })
    return convertUserResponse(updateUser)
  }
}
