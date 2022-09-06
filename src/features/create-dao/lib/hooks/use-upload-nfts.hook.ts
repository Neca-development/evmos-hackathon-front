import { DaoApiService } from '@entities/dao'
import type { IFile, IImageFiles } from '@features/create-dao/model'

export const useUploadNfts = () => {
  const [uploadNfts] = DaoApiService.useUploadNftsMutation()

  const getImageLinks = async (imageFiles: IImageFiles) => {
    const imageFilesValues: IFile[] = Object.values(imageFiles)
    const isFilesValid = imageFilesValues.every((file) => file != null)

    if (!isFilesValid) {
      throw new Error('Invalid files were passed')
    }

    const { daoImage, firstNftImage, secondNftImage, thirdNftImage } = imageFiles

    try {
      const formData = new FormData()
      // @ts-ignore
      formData.append('ava', daoImage)
      // @ts-ignore
      formData.append('lowImg', firstNftImage)
      // @ts-ignore
      formData.append('mediumImg', secondNftImage)
      // @ts-ignore
      formData.append('highImg', thirdNftImage)

      const imageLinks = await uploadNfts({ formData }).unwrap()

      if (!imageLinks) {
        throw new Error('IPFS links to passed images is undefined')
      }

      return imageLinks
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return { getImageLinks }
}
