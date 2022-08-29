export interface IGetInfoFromIpfsRequest {
  ipfsUrl: string | undefined
}

export interface IGetInfoFromIpfsResponse {
  name: string
  descr: string
  ava: string
  lowImg: string
  mediumImg: string
  highImg: string
}
