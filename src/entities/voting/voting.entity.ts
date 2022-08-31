import type { IDaoEntity } from '@entities/dao'

export interface IVotingEntity {
  id: number
  ipfsUrl: string
  smartContractId: number
  dao: IDaoEntity
}
