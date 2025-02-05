import { User } from 'src/entity/user.entity'
import { SignupBodyDto } from 'src/module/auth/dto/signup.dto'
import { UpdateUserBodyDto } from 'src/module/user/dto/update-user.dto'
import { NoDataError } from 'src/type/error/error'
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

    const user = this.create({
      signinId: body.signinId,
      password,
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      gender: body.gender
    })

    return this.save(user)
  }

  /**
   * 유저 정보 조회
   * @param userId `number`
   * @returns `Promise<User | undefined>`
   */
  getUser = async (id: number): Promise<User | undefined> => {
    return this.findOne({
      where: { id }
    })
  }

  /**
   * signinId로 유저 조회
   * @param signinId `string`
   * @returns `Promise<User | undefined>`
   */
  getUserBySigninId = async (signinId: string): Promise<User | undefined> => {
    return this.findOne({ where: { signinId } })
  }

  /**
   * 유저 정보 수정
   * @param id `number`
   * @param body `UpdateUserBodyDto`
   * @returns `Promise<User>`
   */
  updateUser = async (id: number, body: UpdateUserBodyDto): Promise<User> => {
    const user = await this.getUser(id)

    if (!user) {
      throw NoDataError
    }

    if (body.email) {
      user.email = body.email
    }

    if (body.phoneNumber) {
      user.phoneNumber = body.phoneNumber
    }

    if (body.gender) {
      user.gender = body.gender
    }

    return this.save(user)
  }

  /**
   * 비밀번호 변경
   * @param id `number`
   * @param password `string`
   * @returns `Promise<User>`
   */
  changePassword = async (id: number, password: string): Promise<User> => {
    const user = await this.getUser(id)

    if (!user) {
      throw NoDataError
    }

    const newPassword = await encryptPassword(password)

    user.password = newPassword

    return this.save(user)
  }
}
