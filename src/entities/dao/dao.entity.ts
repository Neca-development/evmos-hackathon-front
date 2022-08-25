import type { IUserEntity } from '@entities/user'

export interface IDaoEntity {
  id: number
  ipfsUrl: string
  contractAddress: string
  users: IUserEntity[]
}
