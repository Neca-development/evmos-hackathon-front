export interface IGenerateDaoLinksRequest {
  name: string
  descr: string
  symbol: string
  ava: string
  lowImg: string
  mediumImg: string
  highImg: string
}

export interface IGenerateDaoLinksResponse {
  dao: string
  lowToken: string
  mediumToken: string
  highToken: string
}
