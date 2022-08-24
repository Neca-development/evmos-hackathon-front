import { useEthers } from '@usedapp/core'
import * as React from 'react'

import { DAO_FACTORY_ADDRESS } from '../constants'
import type { TransactionStatus } from '../lib'
import { DaoFactoryAbi__factory } from '../typechain/factories/DaoFactoryAbi__factory'

export const useCreateVoting = () => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')

  const { library } = useEthers()

  const createVoting = async () => {
    if (!library) throw new Error('Wallet is not connected')

    const daoContract = DaoFactoryAbi__factory.connect(DAO_FACTORY_ADDRESS, library)

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
