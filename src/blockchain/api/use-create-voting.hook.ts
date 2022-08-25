import * as React from 'react'

import type { TransactionStatus } from '../lib'
import type { DaoAbi } from '../typechain'

export const useCreateVoting = (daoContract: DaoAbi | null) => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')

  const createVoting = async () => {
    if (!daoContract) {
      setTxStatus('error')
      setTxMessage('Wallet is not connected')
      return
    }

    try {
      setTxStatus('pending')
      setTxMessage('Waiting for wallet confirmation...')

      const createVotingTransaction = await daoContract.createVoting()

      setTxMessage('Waiting for voting creation...')

      await createVotingTransaction.wait()

      setTxStatus('success')
      setTxMessage('You successfully created new voting')
    } catch (error: any) {
      setTxStatus('error')
      setTxMessage(error.message)
    }
  }

  return { txStatus, txMessage, createVoting }
}
