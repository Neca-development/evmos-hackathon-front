import type { DaoModelService } from '@entities/dao'

export interface IVotingEntity {
  id: number
  ipfsUrl: string
  smartContractId: number
  dao: DaoModelService.IDaoEntity
}
