import type { IMintRequestEntity } from '../model/mint-request.entity'

export interface IGetMintRequestsForUserRequest {
  userAddress: string | undefined
}

export type IGetMintRequestsForUserResponse = IMintRequestEntity[]
