import { useEthers } from '@usedapp/core'
import * as React from 'react'

import type { TokenTypeEnum, TransactionStatus } from '../lib'
import { DaoAbi__factory } from '../typechain'

export const useMint = () => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')

  const { library, account } = useEthers()

  const mintNft = async (
    daoAddress: string,
    tokenRarity: TokenTypeEnum,
    signature: string
  ) => {
    if (!library || !account) {
      setTxStatus('error')
      setTxMessage('Wallet is not connected')
      throw new Error('error: wallet is not connected')
    }

    const signer = library.getSigner()

    const daoContract = DaoAbi__factory.connect(daoAddress, signer)

    try {
      setTxStatus('pending')
      setTxMessage('Waiting for wallet confirmation...')

      const mintNftTransaction = await daoContract.mintNft(tokenRarity, signature)

      setTxMessage('Waiting for mint...')

      await mintNftTransaction.wait()

      setTxStatus('success')
      setTxMessage('You successfully minted NFT')
    } catch (error: any) {
      setTxStatus('error')
      setTxMessage(error.message)
      throw new Error(error.message)
    }
  }

  return { txStatus, txMessage, mintNft }
}
