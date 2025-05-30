import { ICommonError } from './common-error.interface'

// Common Errors: 일반적인 에러들
export const NoDataError: ICommonError = {
  status: 404,
  code: 'Common-001',
  message: { ko: '데이터가 없습니다' }
}

// Auth Errors: 인증 관련 에러들
export const InsufficientScope: ICommonError = {
  status: 403,
  code: 'Auth-001',
  message: { ko: '권한이 없습니다' }
}

export const JWTInvalidError: ICommonError = {
  status: 401,
  code: 'Auth-002',
  message: { ko: '로그인이 필요합니다' }
}

export const InvalidUserError: ICommonError = {
  status: 401,
  code: 'Auth-003',
  message: { ko: '유효하지 않은 사용자 정보입니다' }
}

export const InvalidPasswordError: ICommonError = {
  status: 401,
  code: 'Auth-004',
  message: { ko: '비밀번호가 일치하지 않습니다.' }
}

export const PasswordMismatchError: ICommonError = {
  status: 400,
  code: 'Auth-005',
  message: { ko: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.' }
}

// User Errors: 사용자 관련 에러들
export const DuplicateIdError: ICommonError = {
  status: 409,
  code: 'User-001',
  message: { ko: '아이디가 이미 존재합니다' }
}
