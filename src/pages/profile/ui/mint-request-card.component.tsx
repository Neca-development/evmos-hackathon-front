import { DaoApi } from '@entities/dao'
import { MintRequestApi } from '@entities/mint-request'
import type { IMintRequestEntity } from '@entities/mint-request/mint-request.entity'
import { UserApi } from '@entities/user'
import {
  HeadingFour,
  HeadingThree,
  MButton,
  MDivider,
  MPaper,
  Paragraph,
  ProcessingModal,
} from '@shared/ui'
import { useEthers } from '@usedapp/core'
import * as React from 'react'
import { useMint } from 'src/blockchain'

import { DaoCardSkeleton } from './dao-card-skeleton.component'

interface IMintRequestCardProperties {
  mintRequest: IMintRequestEntity
  onMint: () => void
}

export function MintRequestCard(props: IMintRequestCardProperties) {
  const { mintRequest, onMint } = props

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalText, setModalText] = React.useState('')
  const [isRequestInProgress, setIsRequestInProgress] = React.useState(false)

  const { account } = useEthers()

  const { data: dao } = DaoApi.useGetDaoQuery({ daoAddress: mintRequest.daoAddress })
  const { data: daoInfo } = DaoApi.useGetInfoFromIpfsQuery({ ipfsUrl: dao?.ipfsUrl })

  const [generateMintSignature] = MintRequestApi.useGenerateMintSignatureMutation()
  const [createUser] = UserApi.useCreateUserMutation()
  const [addUserToDao] = DaoApi.useAddUserMutation()
  const [deleteMintRequest] = MintRequestApi.useDeleteMintRequestMutation()

  const { mintNft } = useMint()

  const handleClickOnMintButton = async () => {
    if (!account) return

    try {
      setIsModalOpen(true)
      setIsRequestInProgress(true)
      setModalText('Generating signature for your request...')

      const signature = await generateMintSignature({
        mintRequestId: mintRequest.id,
      }).unwrap()

      setIsRequestInProgress(false)

      await mintNft(mintRequest.daoAddress, mintRequest.tokenType, signature)

      setIsRequestInProgress(true)
      setModalText('Almost done...')

      await createUser({ daoAddress: mintRequest.daoAddress, userAddress: account })
      await addUserToDao({ daoAddress: mintRequest.daoAddress, userAddress: account })
      await deleteMintRequest({ mintRequestId: mintRequest.id })
      onMint()

      setIsRequestInProgress(false)
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleModalClose = () => setIsModalOpen(false)

  return (
    <>
      {!daoInfo ? (
        <DaoCardSkeleton />
      ) : (
        <MPaper className="w-full space-y-3">
          {/* DAO info */}
          <div className="space-x-4 flex">
            <div className="h-[6rem] w-[6rem] flex justify-center items-center bg-[#D9D9D9]">
              <img src={daoInfo.ava} alt="" className="w-full" />
            </div>
            <div className="py-2 flex flex-col">
              <HeadingThree className="mb-3 text-orange">{daoInfo.name}</HeadingThree>
              <Paragraph>{daoInfo.descr}</Paragraph>
            </div>
          </div>
          {/* /DAO info */}

          <MDivider />

          {/* Token info */}
          <HeadingFour>NFT with a 1 vote weight is available for mint</HeadingFour>
          <div className="flex justify-between items-end">
            <div className="h-14 w-14 flex justify-center items-center bg-[#D9D9D9]" />

            <MButton onClick={handleClickOnMintButton}>Mint</MButton>
          </div>
          {/* /Token info */}
        </MPaper>
      )}

      <ProcessingModal onClose={handleModalClose} />
    </>
  )
}
