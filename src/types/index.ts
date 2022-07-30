export interface ApiResponse<T = any> {
  success: boolean,
  msg: string,
  data: T,
  operateCode: number
}
