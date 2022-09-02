import { DaoApi } from '@entities/dao'
import type { IUploadNftsDto } from '@entities/dao/model/upload-nfts.dto'
import * as React from 'react'

interface IDaoInfo {
  name: string
  description: string
  symbol: string
  imageLinks: IUploadNftsDto | undefined
}
export const useGenerateDaoInfoLink = () => {
  const [daoLinks, setDaoLinks] = React.useState({
    dao: '',
    lowToken: '',
    mediumToken: '',
    highToken: '',
  })

  const [generateDaoLinks] = DaoApi.useGenerateDaoLinksMutation()

  const getDaoLinks = async (daoInfo: IDaoInfo) => {
    if (!daoInfo.imageLinks) return

    try {
      const [daoImageUri, firstNftImageUri, secondNftImageUri, thirdNftImageUri] =
        daoInfo.imageLinks

      if (!daoImageUri) return
      if (!firstNftImageUri) return
      if (!secondNftImageUri) return
      if (!thirdNftImageUri) return

      const { dao, lowToken, mediumToken, highToken } = await generateDaoLinks({
        name: daoInfo.name,
        descr: daoInfo.description,
        symbol: daoInfo.symbol,
        ava: daoImageUri,
        lowImg: firstNftImageUri,
        mediumImg: secondNftImageUri,
        highImg: thirdNftImageUri,
      }).unwrap()

      setDaoLinks({
        dao,
        lowToken,
        mediumToken,
        highToken,
      })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return { daoLinks, getDaoLinks }
}
