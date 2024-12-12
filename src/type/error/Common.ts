export interface ICommonError {
  status: number
  code: string
  message: {
    [key: string]: string
  }
  origin?: string
}

export const NoDataError: ICommonError = {
  status: 404,
  code: 'Common-001',
  message: { ko: '데이터가 없습니다' }
}

export const InsufficientScope: ICommonError = {
  status: 403,
  code: 'Auth-002',
  message: { ko: '권한이 없습니다' }
}
