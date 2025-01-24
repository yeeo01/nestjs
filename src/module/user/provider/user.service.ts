import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from 'src/repository/user.repository' // 수정
import { UserResponse, convertUserResponse } from 'src/response/user.response'
import {
  InvalidPasswordError,
  NoDataError,
  PasswordMismatchError
} from 'src/type/error/error'
import { UpdateUserBodyDto } from '../dto/update-user.dto'
import { Connection } from 'typeorm'
import { ChangePasswordDto } from '../dto/change-password.dto'
import { comparePassword } from 'src/util/PasswordEncrypt'

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

  /**
   * 비밀번호 변경
   * @param userId `number`
   * @param changePasswordDto `ChangePasswordDto`
   * @returns `Promise<string>`
   */
  changePassword = async (
    userId: number,
    changePasswordDto: ChangePasswordDto
  ): Promise<string> => {
    const { oldPassword, newPassword, confirmPassword } = changePasswordDto

    const updateUser = await this.connection.transaction(async (manager) => {
      // 사용자 조회
      const user = await this.userRepository.getUser(userId)

      if (!user) {
        throw NoDataError
      }

      // 기존 비밀번호 확인
      const isOldPasswordValid = await comparePassword(
        oldPassword,
        user.password
      )

      if (!isOldPasswordValid) {
        throw InvalidPasswordError
      }

      // 새 비밀번호와 확인 비밀번호 일치 여부 확인
      if (newPassword !== confirmPassword) {
        throw PasswordMismatchError
      }

      // 비밀번호 변경
      await manager
        .getCustomRepository(UserRepository)
        .changePassword(userId, newPassword)

      return 'ok'
    })

    return updateUser
  }
}
