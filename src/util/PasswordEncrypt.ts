import bcrypt from 'bcrypt'

/**
 * 사용자 비밀번호 해시
 * @param password `string`
 * @returns `Promise<string>`
 */
export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
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

/**
 * 리프레시 토큰 해싱 함수
 * @param token 원본 리프레시 토큰
 * @returns 해싱된 토큰 문자열
 */
export const hashRefreshToken = async (token: string): Promise<string> =>
  await bcrypt.hash(token, 10)

/**
 * 리프레시 토큰 검증 함수
 * @param token 클라이언트가 보내온 원본 리프레시 토큰
 * @param hashedToken DB에 저장된 해시된 토큰
 * @returns 검증 성공 여부 (true/false)
 */
export const verifyRefreshToken = async (
  token: string,
  hashedToken: string
): Promise<boolean> => await bcrypt.compare(token, hashedToken)
