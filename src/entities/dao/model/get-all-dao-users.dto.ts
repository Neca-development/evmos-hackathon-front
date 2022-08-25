import type { IUserEntity } from '@entities/user'

export interface IGetAllDaoUsersRequest {
  daoAddress: string
}

export type IGetAllDaoUsersDto = IUserEntity[]
