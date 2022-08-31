import type { IUserEntity } from '@entities/user'
import type { IVotingEntity } from '@entities/voting'

export interface IDaoEntity {
  id: number
  ipfsUrl: string
  contractAddress: string
  users: IUserEntity[]
  votings: IVotingEntity[]
}
