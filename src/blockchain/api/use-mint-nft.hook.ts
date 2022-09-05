import { useModal } from '@shared/lib'
import { useEthers } from '@usedapp/core'

import type { TokenTypeEnum } from '../lib'
import { DaoAbi__factory } from '../typechain'

export const useMintNft = () => {
  const { library, account } = useEthers()
  const { setModalState, setModalText } = useModal()

  const mintNft = async (
    daoAddress: string,
    tokenRarity: TokenTypeEnum,
    signature: string
  ) => {
    if (!library || !account) {
      setModalState('error')
      setModalText('Wallet is not connected')
      return
    }

    const signer = library.getSigner()
    const daoContract = DaoAbi__factory.connect(daoAddress, signer)

    try {
      setModalText('Waiting for wallet confirmation...')

      const mintNftTransaction = await daoContract.mintNft(tokenRarity, signature)

      setModalText('Waiting for mint...')

      await mintNftTransaction.wait()
    } catch (error: any) {
      setModalState('error')
      setModalText('An error occurred while executing transaction')
      throw new Error(error.message)
    }
  }

  return { mintNft }
}
