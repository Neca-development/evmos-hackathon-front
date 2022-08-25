export interface IGetAllUserMintRequests {
  userAddress: string
}

export interface IGetAllUserMintRequestsDto {
  id: number
  userAddress: string
  tokenType: number
  daoAddress: string
}
