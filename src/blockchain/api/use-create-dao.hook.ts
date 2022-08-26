import { useEthers } from '@usedapp/core'
import React from 'react'

import { DAO_FACTORY_ADDRESS } from '../constants'
import type { TransactionStatus } from '../lib'
import { DaoFactoryAbi__factory } from '../typechain/factories/DaoFactoryAbi__factory'

export const useCreateDao = () => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')
  const [daoContractAddress, setDaoContractAddress] = React.useState('')

  const { library, account } = useEthers()

  const createDao = async (
    name: string,
    symbol: string,
    commonUri: string,
    rareUri: string,
    legendaryUri: string
  ) => {
    if (!library || !account) {
      setTxStatus('error')
      setTxMessage('Wallet is not connected')
      console.log('error: wallet is not connected')
      return
    }

    const signer = library.getSigner()

    const daoFactoryContract = DaoFactoryAbi__factory.connect(DAO_FACTORY_ADDRESS, signer)

    try {
      setTxStatus('pending')
      setTxMessage('Waiting for wallet confirmation...')
      console.log('pending: waiting for wallet confirmation')

      const createDaoTransaction = await daoFactoryContract.createDAO(
        name,
        symbol,
        commonUri,
        rareUri,
        legendaryUri
      )

      setTxMessage('Waiting for DAO creation...')
      console.log('pending: waiting for dao creation')

      daoFactoryContract.on(
        'DAOCreated',
        (contractAddress: string, creatorAddress: string) => {
          console.log('contract address:', contractAddress)
          console.log('creator address:', creatorAddress)
          console.log('user address:', account)
          if (account === creatorAddress) {
            setDaoContractAddress(contractAddress)
            daoFactoryContract.removeAllListeners('DAOCreated')
          }
        }
      )

      await createDaoTransaction.wait()

      setTxStatus('success')
      setTxMessage('You successfully created new DAO')
      console.log('success: you successfully created new dao')
    } catch (error: any) {
      daoFactoryContract.removeAllListeners('DAOCreated')
      setTxStatus('error')
      setTxMessage(error.message)
      console.log('error:', error.message)
    }
  }
  return { daoContractAddress, txStatus, txMessage, createDao }
}
