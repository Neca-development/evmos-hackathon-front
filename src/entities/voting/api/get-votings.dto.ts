import type { IVotingEntity } from '../model/voting.entity'

export interface IGetVotingsRequest {
  daoAddress: string
}

export type IGetVotingsResponse = IVotingEntity[]
