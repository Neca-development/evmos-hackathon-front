import { useEthers } from '@usedapp/core'
import type { BigNumber } from 'ethers'
import * as React from 'react'

import type { TransactionStatus } from '../lib'
import { DaoAbi__factory } from '../typechain'

export const useCreateVoting = () => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')
  const [votingId, setVotingId] = React.useState<number | null>(null)

  const { library, account } = useEthers()

  const createVoting = async (daoAddress: string) => {
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

      const createVotingTransaction = await daoContract.createVoting()

      setTxMessage('Waiting for voting creation...')
      console.log('pending: waiting for voting creation')

      daoContract.on('VoteCreated', (newVotingId: BigNumber, dao: string) => {
        if (daoAddress === dao) {
          setVotingId(+newVotingId)
          daoContract.removeAllListeners('VoteCreated')
        }
      })

      await createVotingTransaction.wait()

      setTxStatus('success')
      setTxMessage('You successfully created new voting')
      console.log('success: you successfully created new voting')
    } catch (error: any) {
      setTxStatus('error')
      setTxMessage(error.message)
      console.log('error:', error.message)
    }
  }

  return { votingId, txStatus, txMessage, createVoting }
}
