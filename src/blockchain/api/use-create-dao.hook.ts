import { useEthers } from '@usedapp/core'
import React from 'react'

import { DAO_FACTORY_ADDRESS } from '../constants'
import type { TransactionStatus } from '../lib'
import { DaoFactoryAbi__factory } from '../typechain/factories/DaoFactoryAbi__factory'

export const useCreateDao = () => {
  const [txStatus, setTxStatus] = React.useState<TransactionStatus>('none')
  const [txMessage, setTxMessage] = React.useState('')

  const { library } = useEthers()

  const createDao = async (
    name: string,
    symbol: string,
    commonUri: string,
    rareUri: string,
    legendaryUri: string
  ) => {
    if (!library) {
      setTxStatus('error')
      setTxMessage('Wallet is not connected')
      return
    }

    const daoFactoryContract = DaoFactoryAbi__factory.connect(
      DAO_FACTORY_ADDRESS,
      library
    )

    try {
      setTxStatus('pending')
      setTxMessage('Waiting for wallet confirmation...')

      const createDaoTransaction = await daoFactoryContract.createDAO(
        name,
        symbol,
        commonUri,
        rareUri,
        legendaryUri
      )

      setTxMessage('Waiting for voting creation...')

      await createDaoTransaction.wait()

      setTxStatus('success')
      setTxMessage('You successfully created new voting')
    } catch (error: any) {
      setTxStatus('error')
      setTxMessage(error.message)
    }
  }

  return { txStatus, txMessage, createDao }
}
