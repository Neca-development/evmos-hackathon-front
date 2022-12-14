import { useMetamask } from '@blockchain/lib'
import { useModal } from '@shared/lib'
import React from 'react'

import { DAO_FACTORY_ADDRESS } from '../constants'
import type { DaoFactoryAbi } from '../typechain'
import { DaoFactoryAbi__factory } from '../typechain/factories/DaoFactoryAbi__factory'

export const useCreateDaoSc = () => {
  const [daoFactoryContract, setDaoFactoryContract] =
    React.useState<DaoFactoryAbi | null>(null)
  const [daoAddress, setDaoAddress] = React.useState('')
  const { signer, account } = useMetamask()

  React.useEffect(() => {
    if (signer && account) {
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
  }, [signer, account])

  const { setModalState, setModalText } = useModal()

  const createDaoSc = async (name: string, symbol: string, metaUri: string) => {
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
        metaUri
      )

      setModalText('Waiting for DAO creation...')

      await createDaoTransaction.wait()
    } catch (error: any) {
      setModalState('error')
      setModalText('An error occurred while executing transaction')
      console.error('error:', error.message)
    }
  }

  return { daoAddress, createDaoSc }
}
