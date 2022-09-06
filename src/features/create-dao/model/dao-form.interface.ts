import type { DaoApiService } from '@entities/dao'

export type IFile = File | null | undefined

export interface IImageFiles {
  daoImage: IFile
  firstNftImage: IFile
  secondNftImage: IFile
  thirdNftImage: IFile
}

export interface IDaoForm extends IImageFiles {
  name: string
  description: string
  symbol: string
}

export interface IDaoMetadata {
  name: string
  description: string
  symbol: string
  imageLinks: DaoApiService.IUploadNftsResponse
}
