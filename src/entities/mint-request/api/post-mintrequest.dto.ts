import type { TokenTypeEnum } from '@blockchain/lib'

export interface IPostMintRequestRequest {
  userAddress: string
  daoAddress: string
  tokenType: TokenTypeEnum
}
