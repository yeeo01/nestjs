import bcrypt from 'bcrypt'

/**
 * 사용자 비밀번호 해시
 * @param password `string`
 * @returns `Promise<string>`
 */
export async function encryptPassword (password: string) {
  return bcrypt.hashSync(password, 10)
}
