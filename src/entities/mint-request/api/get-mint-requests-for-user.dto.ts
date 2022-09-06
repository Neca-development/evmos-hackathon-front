import type { IMintRequestEntity } from '../model'

export interface IGetMintRequestsForUserRequest {
  userAddress: string | undefined
}

export type IGetMintRequestsForUserResponse = IMintRequestEntity[]
