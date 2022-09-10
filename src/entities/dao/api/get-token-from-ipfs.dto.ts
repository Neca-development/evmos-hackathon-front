export interface IGetTokenFromIpfsRequest {
  ipfsUrl: string | undefined
}

export interface IGetTokenFromIpfsResponse {
  name: string
  symbol: string
  descr: string
  type: number
  img: string
}
