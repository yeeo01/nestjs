import { UserToken } from 'src/entity/user-token.entity'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
  /**
   * 사용자 리프레시 토큰 저장 (있으면 업데이트, 없으면 생성)
   * @param userId 사용자 ID
   * @param refreshToken 리프레시 토큰 문자열
   * @param expiredAt 토큰 만료일시 (optional)
   */
  saveRefreshToken = async (
    userId: number,
    refreshToken: string,
    expiredAt: Date
  ): Promise<UserToken> => {
    let userToken = await this.findOne({ where: { userId } })

    if (!userToken) {
      userToken = this.create({
        userId,
        refreshToken,
        expiredAt: expiredAt
      })
    } else {
      userToken.refreshToken = refreshToken
      userToken.expiredAt = expiredAt
    }

    return this.save(userToken)
  }
}
