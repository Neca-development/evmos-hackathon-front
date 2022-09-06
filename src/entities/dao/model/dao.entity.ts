import type { UserModelService } from '@entities/user'
import type { VotingModelService } from '@entities/voting'

export interface IDaoEntity {
  id: number
  ipfsUrl: string
  contractAddress: string
  users: UserModelService.IUserEntity[]
  __votings__: VotingModelService.IVotingEntity[]
}
