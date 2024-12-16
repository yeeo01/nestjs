import { User } from 'src/entity/user.entity'
import { SignupBodyDto } from 'src/module/auth/dto/signup.dto'
import { encryptPassword } from 'src/util/PasswordEncrypt'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * 회원가입
   * @param body `SignupBodyDto`
   * @returns `Promise<User>`
   */
  signUp = async (body: SignupBodyDto) => {
    // 비밀번호 암호화
    const password = await encryptPassword(body.password)

    return this.save(
      this.create({
        signinId: body.signinId,
        password: password,
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        gender: body.gender
      })
    )
  }

  /**
   * 내 정보 조회
   * @param userId `number`
   * @returns `Promise<User | undefined>`
   */
  getUser = async (userId: number): Promise<User | undefined> => {
    return this.findOne({
      where: { id: userId }
    })
  }
}
