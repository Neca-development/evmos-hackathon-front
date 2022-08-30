import { useEthers } from '@usedapp/core'
import * as React from 'react'

import { DAO_FACTORY_ADDRESS } from '../constants'
import type { TransactionStatus } from '../lib'
import { DaoAbi__factory } from '../typechain'

export const useMint = () => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')

  const { library, account } = useEthers()

  const mintNft = async (tokenRarity: number, signature: string) => {
    if (!library || !account) {
      setTxStatus('error')
      setTxMessage('Wallet is not connected')
      console.log('error: wallet is not connected')
      return
    }

    const signer = library.getSigner()

    const daoContract = DaoAbi__factory.connect(DAO_FACTORY_ADDRESS, signer)

    try {
      setTxStatus('pending')
      setTxMessage('Waiting for wallet confirmation...')
      console.log('pending: waiting for wallet confirmation')

      const createVotingTransaction = await daoContract.mintNft(tokenRarity, signature)

      setTxMessage('Waiting for mint...')
      console.log('pending: waiting for mint')

      await createVotingTransaction.wait()

      setTxStatus('success')
      setTxMessage('You successfully minted NFT')
      console.log('success: minted nft')
    } catch (error: any) {
      setTxStatus('error')
      setTxMessage(error.message)
      console.log('error:', error.message)
    }
  }

  return { txStatus, txMessage, mintNft }
}
