import type { IUserEntity } from '@entities/user'
import type { VotingModelService } from '@entities/voting'

export interface IDaoEntity {
  id: number
  ipfsUrl: string
  contractAddress: string
  users: IUserEntity[]
  __votings__: VotingModelService.IVotingEntity[]
}
