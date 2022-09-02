import { DaoApi } from '@entities/dao'
import { MintRequestApi } from '@entities/mint-request'
import {
  FileInput,
  HeadingTwo,
  MButton,
  MTextField,
  Paragraph,
  ProcessingModal,
} from '@shared/ui'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import * as React from 'react'
import { TokenTypeEnum, useCreateDao } from 'src/blockchain'

import { useGenerateDaoInfoLink, useUploadNfts } from '../model'

interface IDaoFormProperties {
  name: string
  description: string
  tokenSymbol: string
  daoImage: File | null | undefined
  firstNftImage: File | null | undefined
  secondNftImage: File | null | undefined
  thirdNftImage: File | null | undefined
}

const daoFormInitialState: IDaoFormProperties = {
  name: '',
  description: '',
  tokenSymbol: 'TEST',
  daoImage: null,
  firstNftImage: null,
  secondNftImage: null,
  thirdNftImage: null,
}

export function CreateDaoForm() {
  const [daoForm, setDaoForm] = React.useState<IDaoFormProperties>(daoFormInitialState)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalText, setModalText] = React.useState('')
  const [isRequestInProgress, setIsRequestInProgress] = React.useState(false)
  const [isDaoCreated, setIsDaoCreated] = React.useState(false)

  const { account } = useEthers()
  const router = useRouter()

  React.useEffect(() => {
    router.prefetch('/profile')
  }, [])

  const [createDaoOnBackend] = DaoApi.useCreateDaoMutation()
  const [postMintRequest] = MintRequestApi.usePostMintRequestMutation()

  const { getImageLinks } = useUploadNfts()
  const { daoLinks, getDaoLinks } = useGenerateDaoInfoLink()

  const { txStatus, txMessage, daoContractAddress, createDao } = useCreateDao()

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDaoForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleImageChange = (name: string, newImage: File | null | undefined) => {
    setDaoForm((previous) => ({ ...previous, [name]: newImage }))
  }

  const handleClickOnCreateButton = async () => {
    try {
      setIsModalOpen(true)
      setIsRequestInProgress(true)
      setModalText('Uploading DAO info to IPFS...')

      const imagesFiles = {
        daoImage: daoForm.daoImage,
        firstNftImage: daoForm.firstNftImage,
        secondNftImage: daoForm.secondNftImage,
        thirdNftImage: daoForm.thirdNftImage,
      }
      const imageLinks = await getImageLinks(imagesFiles)

      const daoInfo = {
        name: daoForm.name,
        description: daoForm.description,
        symbol: daoForm.tokenSymbol,
        imageLinks,
      }
      await getDaoLinks(daoInfo)

      setIsRequestInProgress(false)

      await createDao(daoForm.name, daoForm.tokenSymbol, daoLinks.dao)
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleModalClose = () => {
    if (isDaoCreated) {
      setIsModalOpen(false)
      router.push('/profile')
    }
  }

  React.useEffect(() => {
    async function finishDaoCreation() {
      if (account && daoLinks.dao && daoContractAddress) {
        setIsRequestInProgress(true)
        setModalText('Almost done...')

        await createDaoOnBackend({
          contractAddress: daoContractAddress,
          ipfsUrl: daoLinks.dao,
        })
        await postMintRequest({
          daoAddress: daoContractAddress,
          tokenType: TokenTypeEnum.HIGH,
          userAddress: account,
        })

        setIsRequestInProgress(false)
        setIsDaoCreated(true)
      }
    }
    finishDaoCreation()
  }, [account, daoLinks.dao, daoContractAddress])

  const isCreateButtonDisabled =
    !daoForm.name ||
    !daoForm.description ||
    !daoForm.tokenSymbol ||
    !daoForm.daoImage ||
    !daoForm.firstNftImage ||
    !daoForm.secondNftImage ||
    !daoForm.thirdNftImage

  return (
    <>
      <div className="mb-7 grid grid-cols-5 gap-x-10">
        {/* Dao image */}
        <div className="col-span-2">
          <FileInput
            inputName="daoImage"
            imgFile={daoForm.daoImage}
            onImageChange={handleImageChange}
          />
        </div>
        {/* /Dao image */}

        {/* Dao form */}
        <div className="col-span-3 flex flex-col justify-between space-y-4">
          <MTextField
            name="name"
            label="DAO Name"
            className="w-3/4"
            onChange={handleTextChange}
          />

          <MTextField
            name="description"
            label="DAO Description"
            className="w-3/4"
            multiline
            minRows={6}
            onChange={handleTextChange}
          />

          {/* Tokens images */}
          <div>
            <HeadingTwo className="mb-2 text-base">Add tokens</HeadingTwo>

            <div className="grid grid-cols-5 gap-x-5">
              <div className="space-y-1 flex flex-col justify-center items-center">
                <FileInput
                  inputName="firstNftImage"
                  imgFile={daoForm.firstNftImage}
                  onImageChange={handleImageChange}
                />
                <Paragraph>1 vote</Paragraph>
              </div>

              <div className="space-y-1 flex flex-col justify-center items-center">
                <FileInput
                  inputName="secondNftImage"
                  imgFile={daoForm.secondNftImage}
                  onImageChange={handleImageChange}
                />
                <Paragraph>2 vote</Paragraph>
              </div>

              <div className="space-y-1 flex flex-col justify-center items-center">
                <FileInput
                  inputName="thirdNftImage"
                  imgFile={daoForm.thirdNftImage}
                  onImageChange={handleImageChange}
                />
                <Paragraph>3 vote</Paragraph>
              </div>
            </div>
          </div>
          {/* /Tokens images */}
        </div>
        {/* /Dao form */}
      </div>

      {/* Create button */}
      <div className="flex justify-center">
        <MButton disabled={isCreateButtonDisabled} onClick={handleClickOnCreateButton}>
          Create
        </MButton>
      </div>
      {/* /Create button */}

      <ProcessingModal
        isOpen={isModalOpen}
        isProcessing={isRequestInProgress || txStatus === 'pending'}
        isSuccess={!isRequestInProgress && txStatus === 'success'}
        onClose={handleModalClose}
      >
        {isRequestInProgress ? modalText : txMessage}
      </ProcessingModal>
    </>
  )
}
