import { useMetamask } from '@blockchain/lib'
import { useModal } from '@shared/lib'

import type { TokenTypeEnum } from '../lib'
import { DaoAbi__factory } from '../typechain'

export const useMintNft = () => {
  const { signer } = useMetamask()
  const { setModalState, setModalText } = useModal()

  const mintNft = async (
    daoAddress: string,
    tokenRarity: TokenTypeEnum,
    signature: string
  ) => {
    if (!signer) {
      setModalState('error')
      setModalText('Wallet is not connected')
      return
    }

    try {
      const daoContract = DaoAbi__factory.connect(daoAddress, signer)

      setModalText('Waiting for wallet confirmation...')

      const mintNftTransaction = await daoContract.mintNft(tokenRarity, signature)

      setModalText('Waiting for mint...')

      await mintNftTransaction.wait()
    } catch (error: any) {
      // setModalState('error')
      // setModalText('An error occurred while executing transaction')
      console.log(error)
    }
  }

  return { mintNft }
}
