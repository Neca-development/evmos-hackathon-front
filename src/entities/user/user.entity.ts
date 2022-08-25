import type { IDaoEntity } from '@entities/dao'

export interface IUserEntity {
  id: number
  contractAddress: string
  daos: IDaoEntity[]
}
