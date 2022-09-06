import { DaoApiService } from '@entities/dao'
import type { MintRequestModelService } from '@entities/mint-request'
import { MintRequestApiService } from '@entities/mint-request'
import { UserApiService } from '@entities/user'
import { useModal } from '@shared/lib'
import { useEthers } from '@usedapp/core'
import { useMintNft } from 'src/blockchain'

export const useMint = () => {
  const { account } = useEthers()
  const { setIsModalOpen, setModalState, setModalText } = useModal()

  const [generateMintSignature] = MintRequestApiService.useGenerateMintSignatureMutation()
  const [createUser] = UserApiService.useCreateUserMutation()
  const [addUserToDao] = DaoApiService.useAddUserMutation()
  const [deleteMintRequest] = MintRequestApiService.useDeleteMintRequestMutation()

  const { mintNft } = useMintNft()

  const mint = async (mintRequest: MintRequestModelService.IMintRequestEntity) => {
    setIsModalOpen(true)

    if (!account) {
      setModalState('error')
      setModalText('Wallet is not connected')
      return
    }

    try {
      setModalState('pending')
      setModalText('Generating signature for your request...')

      const signature = await generateMintSignature({
        mintRequestId: mintRequest.id,
      }).unwrap()

      await mintNft(mintRequest.daoAddress, mintRequest.tokenType, signature)

      setModalText('Almost done...')

      await createUser({ daoAddress: mintRequest.daoAddress, userAddress: account })
      await addUserToDao({ daoAddress: mintRequest.daoAddress, userAddress: account })
      await deleteMintRequest({ mintRequestId: mintRequest.id })

      setModalState('success')
      setModalText('NFT successfully minted')
    } catch (error: any) {
      console.error(error)
    }
  }

  return { mint }
}
