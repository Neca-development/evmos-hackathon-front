import type { IVotingEntity } from '../voting.entity'

export interface IGetVotingsRequest {
  daoAddress: string
}

export type IGetVotingsResponse = IVotingEntity[]
