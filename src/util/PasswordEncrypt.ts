import bcrypt from 'bcrypt'

/**
 * 사용자 비밀번호 해시
 * @param password `string`
 * @returns `Promise<string>`
 */
export const encryptPassword = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, 10)
}

/**
 * 비밀번호 비교
 * @param password `string`
 * @param hashedPassword `string`
 * @returns `Promise<boolean>`
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}
