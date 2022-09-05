import { useModal } from '@shared/lib'
import { useEthers } from '@usedapp/core'
import React from 'react'

import { DAO_FACTORY_ADDRESS } from '../constants'
import type { DaoFactoryAbi } from '../typechain'
import { DaoFactoryAbi__factory } from '../typechain/factories/DaoFactoryAbi__factory'

export const useCreateDaoSc = () => {
  const [daoFactoryContract, setDaoFactoryContract] =
    React.useState<DaoFactoryAbi | null>(null)
  const [daoAddress, setDaoAddress] = React.useState('')
  const { library, account } = useEthers()

  React.useEffect(() => {
    if (library && account) {
      const signer = library.getSigner()
      const contract = DaoFactoryAbi__factory.connect(DAO_FACTORY_ADDRESS, signer)
      setDaoFactoryContract(contract)

      contract.on('DAOCreated', (contractAddress: string, creatorAddress: string) => {
        if (account === creatorAddress) {
          setDaoAddress(contractAddress)
        }
      })
    }

    return () => {
      if (daoFactoryContract) {
        daoFactoryContract.removeAllListeners('DAOCreated')
      }
    }
  }, [account])

  const { setModalState, setModalText } = useModal()

  const createDaoSc = async (name: string, symbol: string, infoUri: string) => {
    if (!daoFactoryContract) {
      setModalState('error')
      setModalText('Wallet is not connected')
      return
    }

    try {
      setModalText('Waiting for wallet confirmation...')

      const createDaoTransaction = await daoFactoryContract.createDAO(
        name,
        symbol,
        infoUri
      )

      setModalText('Waiting for DAO creation...')

      await createDaoTransaction.wait()
    } catch (error: any) {
      daoFactoryContract.removeAllListeners('DAOCreated')
      setModalState('error')
      setModalText('An error occurred while executing transaction')
      console.error('error:', error.message)
    }
  }

  return { daoAddress, createDaoSc }
}
