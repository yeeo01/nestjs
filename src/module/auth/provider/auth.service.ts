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
import { ConfigService } from '@nestjs/config'
import { UserTokenRepository } from 'src/repository/user-token.repository'
import { User } from 'src/entity/user.entity'
import { hashRefreshToken } from 'src/util/PasswordEncrypt'

@Injectable()
export class AuthService {
  constructor (
    private readonly connection: Connection,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokenRepository
  ) {}

  /**
   * JWT 토큰 생성
   * @param user User
   * @param type 'access' | 'refresh'
   * @returns string JWT 토큰
   */
  createToken = async (
    user: User,
    type: 'access' | 'refresh'
  ): Promise<string> => {
    const payload = { userId: user.id, name: user.name }

    const secret =
      type === 'access'
        ? this.configService.get<string>('JWT_ACCESS_SECRET')
        : this.configService.get<string>('JWT_REFRESH_SECRET')

    const expirationTimeRaw =
      type === 'access'
        ? this.configService.get<string>('JWT_ACCESS_EXPIRATION')
        : this.configService.get<string>('JWT_REFRESH_EXPIRATION')

    const expiresIn = Number(expirationTimeRaw)

    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn
    })
  }

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

    // access / refresh 토큰 생성
    const accessToken = await this.createToken(user, 'access')
    const refreshToken = await this.createToken(user, 'refresh')

    const refreshExpiresIn = Number(
      this.configService.get<string>('JWT_REFRESH_EXPIRATION')
    )
    const expiredAt = new Date(Date.now() + refreshExpiresIn * 1000)

    // 리프레시 토큰 해싱 후 저장
    const hashedRefreshToken = await hashRefreshToken(refreshToken)

    // 리프레시 토큰 저장
    await this.userTokenRepository.saveRefreshToken(
      user.id,
      hashedRefreshToken,
      expiredAt
    )

    return convertLoginResponse(accessToken, refreshToken, user)
  }
}
