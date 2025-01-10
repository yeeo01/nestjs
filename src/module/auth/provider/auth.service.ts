import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/repository/user.repository'
import { SignupBodyDto } from '../dto/signup.dto'
import { Connection } from 'typeorm'
import { convertUserResponse, UserResponse } from 'src/response/user.response'
import {
  DuplicateIdError,
  InvalidPasswordError,
  NoDataError
} from 'src/type/error/error'
import { LoginBodyDto } from '../dto/login.dto'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import {
  convertLoginResponse,
  LoginResponse
} from 'src/response/login.response'

@Injectable()
export class AuthService {
  constructor (
    private readonly connection: Connection,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  /**
   * 회원가입
   * @param body `SignupBodyDto`
   * @returns `Promise<UserResponse>`
   */
  signUp = async (body: SignupBodyDto): Promise<UserResponse> => {
    const createUser = await this.connection.transaction(async (manager) => {
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

    return convertUserResponse(createUser)
  }

  /**
   * 로그인
   * @param body `LoginBodyDto`
   * @returns `Promise<LoginResponse>`
   */
  login = async (body: LoginBodyDto): Promise<LoginResponse> => {
    const user = await this.userRepository.findOne({
      where: { signinId: body.signinId }
    })

    if (!user) {
      throw NoDataError
    }

    const isPasswordValid = await compare(body.password, user.password)

    if (!isPasswordValid) {
      throw InvalidPasswordError
    }

    // JWT 토큰 발급
    const payload = { userId: user.id }
    const accessToken = this.jwtService.sign(payload)

    return convertLoginResponse(accessToken, user)
  }
}
