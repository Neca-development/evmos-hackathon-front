import { DaoApiService } from '@entities/dao'
import { MintRequestApiService } from '@entities/mint-request'
import type { IDaoForm, IDaoMetadata, IImageFiles } from '@features/create-dao/model'
import { useModal } from '@shared/lib'
import * as React from 'react'
import { TokenTypeEnum, useCreateDaoSc } from 'src/blockchain'

import { useGenerateDaoInfoLink } from './use-generate-dao-info-link.hook'
import { useUploadNfts } from './use-upload-nfts.hook'

export const useCreateDao = (daoForm: IDaoForm, userAddress: string | undefined) => {
  const [isDaoCreated, setIsDaoCreated] = React.useState(false)

  const { setModalState, setModalText } = useModal()

  const { getImageLinks } = useUploadNfts()
  const { daoLinks, getDaoLinks } = useGenerateDaoInfoLink()
  const { daoAddress, createDaoSc } = useCreateDaoSc()

  const createDao = async () => {
    try {
      setModalState('pending')
      setModalText('Uploading DAO info to IPFS...')

      const imageFiles: IImageFiles = { ...daoForm }
      const imageLinks = await getImageLinks(imageFiles)

      const daoInfo: IDaoMetadata = { ...daoForm, imageLinks }
      await getDaoLinks(daoInfo)

      await createDaoSc(daoForm.name, daoForm.symbol, daoLinks.dao)
    } catch (error: any) {
      console.error(error)
    }
  }

  const [createDaoOnBackend] = DaoApiService.useCreateDaoMutation()
  const [postMintRequest] = MintRequestApiService.usePostMintRequestMutation()

  React.useEffect(() => {
    async function finishDaoCreation() {
      if (userAddress && daoLinks.dao && daoAddress) {
        try {
          await createDaoOnBackend({
            contractAddress: daoAddress,
            ipfsUrl: daoLinks.dao,
          })

          await postMintRequest({
            daoAddress,
            tokenType: TokenTypeEnum.HIGH,
            userAddress,
          })

          setIsDaoCreated(true)
          setModalState('success')
          setModalText('You successfully created new DAO')
        } catch (error: any) {
          setModalState('error')
          setModalText(error.message)
        }
      }
    }
    finishDaoCreation()
  }, [userAddress, daoLinks.dao, daoAddress])

  return { isDaoCreated, createDao }
}
