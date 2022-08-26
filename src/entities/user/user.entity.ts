import type { IDaoEntity } from '@entities/dao'

export interface IUserEntity {
  id: number
  walletAddress: string
  daos: IDaoEntity[]
}
