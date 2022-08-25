import * as React from 'react'

import type { TransactionStatus } from '../lib'
import type { DaoAbi } from '../typechain'

export const useVotingProcess = (daoContract: DaoAbi | null) => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')

  const votingProcess = async (votingId: number, voteType: boolean) => {
    if (!daoContract) {
      setTxStatus('error')
      setTxMessage('Wallet is not connected')
      return
    }
    try {
      setTxStatus('pending')
      setTxMessage('Waiting for wallet confirmation...')

      const createVotingTransaction = await daoContract.vote(votingId, voteType)
      setTxMessage('Voting...')

      await createVotingTransaction.wait()

      setTxStatus('success')
      setTxMessage('You successfully voted')
    } catch (error: any) {
      setTxStatus('error')
      setTxMessage(error.message)
    }
  }

  return { txStatus, txMessage, votingProcess }
}
