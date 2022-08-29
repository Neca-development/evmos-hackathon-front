import type { IMintRequestEntity } from '../mint-request.entity'

export interface IGetMintRequestsForUserRequest {
  userAddress: string | undefined
}

export type IGetMintRequestsForUserResponse = IMintRequestEntity[]
