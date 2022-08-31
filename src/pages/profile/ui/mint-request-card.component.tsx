import { DaoApi } from '@entities/dao'
import { MintRequestApi } from '@entities/mint-request'
import type { IMintRequestEntity } from '@entities/mint-request/mint-request.entity'
import {
  HeadingFour,
  HeadingThree,
  MButton,
  MDivider,
  MPaper,
  Paragraph,
  ProcessingModal,
} from '@shared/ui'
import * as React from 'react'
import { useMint } from 'src/blockchain'

interface IMintRequestCardProperties {
  mintRequest: IMintRequestEntity
}

export function MintRequestCard({ mintRequest }: IMintRequestCardProperties) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalText, setModalText] = React.useState('')
  const [isRequestInProgress, setIsRequestInProgress] = React.useState(false)

  const { data: dao } = DaoApi.useGetDaoQuery({ daoAddress: mintRequest.daoAddress })
  const { data: daoInfo } = DaoApi.useGetInfoFromIpfsQuery({ ipfsUrl: dao?.ipfsUrl })

  const [generateMintSignature] = MintRequestApi.useGenerateMintSignatureMutation()
  const [successMintRequest] = MintRequestApi.useSuccessMintRequestMutation()

  const { txStatus, txMessage, mintNft } = useMint()

  const handleClickOnMintButton = async () => {
    try {
      setIsModalOpen(true)
      setIsRequestInProgress(true)
      setModalText('Generating signature for your request...')

      const signature = await generateMintSignature({
        mintRequestId: mintRequest.id,
      }).unwrap()

      setIsRequestInProgress(false)

      await mintNft(mintRequest.daoAddress, mintRequest.tokenType, signature)
      await successMintRequest({ mintRequestId: mintRequest.id })
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleModalClose = () => setIsModalOpen(false)

  return (
    <>
      <MPaper className="w-full space-y-3">
        {/* DAO info */}
        <div className="space-x-5 flex">
          <div className="h-[6rem] w-[6rem] flex justify-center items-center bg-gray-400">
            <img src={daoInfo?.ava} alt="" className="w-full" />
          </div>
          <div className="flex flex-col justify-end">
            <HeadingThree className="mb-4 text-orange">{daoInfo?.name}</HeadingThree>
            <Paragraph>{daoInfo?.descr}</Paragraph>
          </div>
        </div>
        {/* /DAO info */}

        <MDivider />

        {/* Token info */}
        <HeadingFour>NFT with a 1 vote weight is available for mint</HeadingFour>
        <div className="flex justify-between items-end">
          <div className="h-14 w-14 flex justify-center items-center bg-gray-400" />

          <MButton onClick={handleClickOnMintButton}>Mint</MButton>
        </div>
        {/* /Token info */}
      </MPaper>

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
