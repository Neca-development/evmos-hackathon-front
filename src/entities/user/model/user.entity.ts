import type { DaoModelService } from '@entities/dao'

export interface IUserEntity {
  id: number
  walletAddress: string
  daos: DaoModelService.IDaoEntity[]
}
