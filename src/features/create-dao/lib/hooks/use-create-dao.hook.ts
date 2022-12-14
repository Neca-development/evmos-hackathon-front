import { useCreateDaoSc } from '@blockchain/api'
import { TokenTypeEnum } from '@blockchain/lib'
import { DaoApiService } from '@entities/dao'
import { MintRequestApiService } from '@entities/mint-request'
import type { IDaoForm, IDaoMetadata, IImageFiles } from '@features/create-dao/model'
import { useModal } from '@shared/lib'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useGenerateDaoInfoLink } from './use-generate-dao-info-link.hook'
import { useUploadNfts } from './use-upload-nfts.hook'

export const useCreateDao = (daoForm: IDaoForm, userAddress: string | undefined) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/profile')
  }, [])

  const { setModalState, setModalText } = useModal()

  const { getImageLinks } = useUploadNfts()
  const { baseDaoMetaUri, getDaoLinks } = useGenerateDaoInfoLink()
  const { daoAddress, createDaoSc } = useCreateDaoSc()

  const createDao = async () => {
    try {
      setModalState('pending')
      setModalText('Uploading DAO info to IPFS...')

      const imageFiles: IImageFiles = { ...daoForm }
      const imageLinks = await getImageLinks(imageFiles)

      const daoInfo: IDaoMetadata = { ...daoForm, imageLinks }
      await getDaoLinks(daoInfo)

      await createDaoSc(daoForm.name, daoForm.symbol, baseDaoMetaUri)
    } catch (error: any) {
      console.error(error)
    }
  }

  const [createDaoOnBackend] = DaoApiService.useCreateDaoMutation()
  const [postMintRequest] = MintRequestApiService.usePostMintRequestMutation()

  useEffect(() => {
    async function finishDaoCreation() {
      if (userAddress && baseDaoMetaUri && daoAddress) {
        try {
          await createDaoOnBackend({
            contractAddress: daoAddress,
            ipfsUrl: baseDaoMetaUri,
          })

          await postMintRequest({
            daoAddress,
            tokenType: TokenTypeEnum.HIGH,
            userAddress,
          })

          setModalState('success')
          setModalText('You successfully created new DAO')

          router.push('/profile')
        } catch (error: any) {
          setModalState('error')
          setModalText(error.message)
        }
      }
    }
    finishDaoCreation()
  }, [userAddress, baseDaoMetaUri, daoAddress])

  return { createDao }
}
