import { useEthers } from '@usedapp/core'
import * as React from 'react'

import type { TransactionStatus, VoteTypeEnum } from '../lib'
import { DaoAbi__factory } from '../typechain'

export const useVotingProcess = () => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')

  const { library, account } = useEthers()

  const votingProcess = async (
    daoAddress: string,
    votingId: number,
    voteType: VoteTypeEnum
  ) => {
    if (!library || !account) {
      setTxStatus('error')
      setTxMessage('Wallet is not connected')
      console.log('error: wallet is not connected')
      return
    }

    const signer = library.getSigner()
    const daoContract = DaoAbi__factory.connect(daoAddress, signer)

    try {
      setTxStatus('pending')
      setTxMessage('Waiting for wallet confirmation...')
      console.log('pending: waiting for wallet confirmation')

      const createVotingTransaction = await daoContract.vote(votingId, voteType)
      setTxMessage('Voting...')
      console.log('pending: Voting')

      await createVotingTransaction.wait()

      setTxStatus('success')
      setTxMessage('You successfully voted')
      console.log('success: you successfully voted')
    } catch (error: any) {
      setTxStatus('error')
      setTxMessage(error.message)
      console.log('error:', error.message)
    }
  }

  return { txStatus, txMessage, votingProcess }
}
