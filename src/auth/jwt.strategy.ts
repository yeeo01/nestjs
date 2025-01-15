import { Injectable, HttpException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-custom'
import { ConfigService } from '@nestjs/config'
import { JWTInvalidError, InvalidUserError } from 'src/type/error/error'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor (private readonly configService: ConfigService) {
    super()
  }

  async validate (req: any) {
    const token = req.headers?.authorization?.split(' ')[1]

    // 토큰이 없을 경우 예외 처리
    if (!token) {
      throw new HttpException(
        {
          statusCode: JWTInvalidError.status,
          code: JWTInvalidError.code,
          message: JWTInvalidError.message
        },
        JWTInvalidError.status
      )
    }

    try {
      // JWT 검증
      const decoded = jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET')
      ) as jwt.JwtPayload

      // userId가 없으면 예외 처리
      if (!decoded.userId) {
        throw new HttpException(
          {
            statusCode: InvalidUserError.status,
            code: InvalidUserError.code,
            message: InvalidUserError.message
          },
          JWTInvalidError.status
        )
      }

      // 유효한 경우 사용자 정보 반환
      return { userId: decoded.userId, signinId: decoded.signinId }
    } catch (error) {
      // JWT 검증 중 에러 발생 시
      throw new HttpException(
        {
          statusCode: JWTInvalidError.status,
          code: JWTInvalidError.code,
          message: error.message || JWTInvalidError.message
        },
        JWTInvalidError.status
      )
    }
  }
}
