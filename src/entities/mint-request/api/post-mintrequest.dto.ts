import type { TokenTypeEnum } from 'src/blockchain'

export interface IPostMintRequestRequest {
  userAddress: string
  daoAddress: string
  tokenType: TokenTypeEnum
}
