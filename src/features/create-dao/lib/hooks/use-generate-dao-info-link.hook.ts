import { DaoApiService } from '@entities/dao'
import type { IDaoMetadata } from '@features/create-dao/model'
import { useState } from 'react'

export const useGenerateDaoInfoLink = () => {
  const [baseDaoMetaUri, setBaseDaoMetaUri] = useState('')

  const [generateDaoLinks] = DaoApiService.useGenerateDaoLinksMutation()

  const getDaoLinks = async (daoInfo: IDaoMetadata) => {
    const { name, description, symbol, imageLinks } = daoInfo
    if (!imageLinks) {
      throw new Error('Image links array is undefined')
    }

    const isImageLinksValid = imageLinks.length === 4 && imageLinks.every(Boolean)
    if (!isImageLinksValid) {
      throw new Error('Some of the passed links is invalid')
    }

    const [daoImageUrl, lowTokenImageUrl, mediumTokenImageUrl, highTokenImageUrl] =
      imageLinks

    try {
      const generatedLink = await generateDaoLinks({
        name,
        descr: description,
        symbol,
        // @ts-ignore
        ava: daoImageUrl,
        // @ts-ignore
        lowImg: lowTokenImageUrl,
        // @ts-ignore
        mediumImg: mediumTokenImageUrl,
        // @ts-ignore
        highImg: highTokenImageUrl,
      }).unwrap()

      console.log('generatedLink:', generatedLink)

      setBaseDaoMetaUri(generatedLink.daoMeta)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return { baseDaoMetaUri, getDaoLinks }
}
