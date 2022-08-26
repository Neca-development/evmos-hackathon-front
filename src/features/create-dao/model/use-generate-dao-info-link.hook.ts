import { DaoApi } from '@entities/dao'
import type { IUploadNftsDto } from '@entities/dao/model/upload-nfts.dto'
import * as React from 'react'

interface IDaoInfo {
  name: string
  description: string
  imageLinks: IUploadNftsDto | undefined
}
export const useGenerateDaoInfoLink = () => {
  const [daoInfoLink, setDaoInfoLink] = React.useState('')

  const [generateDaoInfoLink] = DaoApi.useGenerateDaoInfoLinkMutation()

  const getDaoInfoLink = async (daoInfo: IDaoInfo) => {
    if (!daoInfo.imageLinks) return

    try {
      const [daoImageUri, firstNftImageUri, secondNftImageUri, thirdNftImageUri] =
        daoInfo.imageLinks

      if (!daoImageUri) return
      if (!firstNftImageUri) return
      if (!secondNftImageUri) return
      if (!thirdNftImageUri) return

      const infoLink = await generateDaoInfoLink({
        name: daoInfo.name,
        descr: daoInfo.description,
        ava: daoImageUri,
        lowImg: firstNftImageUri,
        mediumImg: secondNftImageUri,
        highImg: thirdNftImageUri,
      }).unwrap()

      setDaoInfoLink(infoLink)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return { daoInfoLink, getDaoInfoLink }
}
