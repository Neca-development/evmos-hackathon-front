export interface IBaseResponse<T> {
  status: number
  data: T
  error: any
}
