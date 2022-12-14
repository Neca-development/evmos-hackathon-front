import { useMetamask } from '@blockchain/lib'
import { useModal } from '@shared/lib'
import type { BigNumber } from 'ethers'
import * as React from 'react'

import type { DaoAbi } from '../typechain'
import { DaoAbi__factory } from '../typechain'

export const useCreateVotingSc = (daoAddress: string) => {
  const [daoContract, setDaoContract] = React.useState<DaoAbi | null>(null)
  const [votingId, setVotingId] = React.useState<number | null>(null)
  const { signer } = useMetamask()

  React.useEffect(() => {
    if (signer) {
      const contract = DaoAbi__factory.connect(daoAddress, signer)
      setDaoContract(contract)

      contract.on('VoteCreated', (newVotingId: BigNumber, dao: string) => {
        if (daoAddress === dao) {
          setVotingId(+newVotingId)
        }
      })
    }

    return () => {
      if (daoContract) {
        daoContract.removeAllListeners('VoteCreated')
      }
    }
  }, [signer])

  const { setModalState, setModalText } = useModal()

  const createVotingSc = async () => {
    if (!daoContract) {
      setModalState('error')
      setModalText('Wallet is not connected')
      return
    }

    try {
      setModalText('Waiting for wallet confirmation...')

      const createVotingTransaction = await daoContract.createVoting()

      setModalText('Waiting for voting creation...')

      await createVotingTransaction.wait()
    } catch (error: any) {
      setModalState('error')
      setModalText('An error occurred while executing transaction')
      console.error('error:', error.message)
    }
  }

  return { votingId, createVotingSc }
}
