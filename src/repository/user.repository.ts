import { User } from 'src/entity/user.entity'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * 내 정보 조회
   * @param userId `number` 사용자 ID
   * @returns `Promise<User | undefined>` 사용자 정보 또는 `undefined`
   */
  getUser = async (userId: number): Promise<User | undefined> => {
    return this.findOne({
      where: { id: userId }
    })
  }
}
