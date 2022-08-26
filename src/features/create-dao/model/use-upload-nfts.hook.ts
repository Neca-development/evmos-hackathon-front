import { DaoApi } from '@entities/dao'

interface IImagesFiles {
  daoImage: File | null | undefined
  firstNftImage: File | null | undefined
  secondNftImage: File | null | undefined
  thirdNftImage: File | null | undefined
}

export const useUploadNfts = () => {
  const [uploadNfts] = DaoApi.useUploadNftsMutation()

  const getImageLinks = async (images: IImagesFiles) => {
    if (!images.daoImage) return
    if (!images.firstNftImage) return
    if (!images.secondNftImage) return
    if (!images.thirdNftImage) return

    try {
      const formData = new FormData()
      formData.append('ava', images.daoImage)
      formData.append('lowImg', images.firstNftImage)
      formData.append('mediumImg', images.secondNftImage)
      formData.append('highImg', images.thirdNftImage)

      return await uploadNfts({ formData }).unwrap()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return { getImageLinks }
}
