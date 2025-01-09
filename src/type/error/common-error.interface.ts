export interface ICommonError {
  status: number
  code: string
  message: {
    [key: string]: string
  }
  origin?: string
}
