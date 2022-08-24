import { useEthers } from '@usedapp/core'
import * as React from 'react'

import { DAO_FACTORY_ADDRESS } from '../constants'
import type { TransactionStatus } from '../lib'
import { DaoFactoryAbi__factory } from '../typechain/factories/DaoFactoryAbi__factory'

export const useVotingProcess = () => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')

  const { library } = useEthers()

  const votingProcess = async (votingId: number, voteType: boolean) => {
    if (!library) throw new Error('Wallet is not connected')

    const daoContract = DaoFactoryAbi__factory.connect(DAO_FACTORY_ADDRESS, library)

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
