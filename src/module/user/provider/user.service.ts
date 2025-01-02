import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from 'src/repository/user.repository' // 수정
import { UserResponse, convertUserResponse } from 'src/responser/user.response'
import { NoDataError } from 'src/type/error/Common'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  /**
   * 내 정보 조회
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
}
