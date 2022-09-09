import { useMetamask } from '@blockchain/lib'
import { useModal } from '@shared/lib'

import type { VoteTypeEnum } from '../lib'
import { DaoAbi__factory } from '../typechain'

export const useVotingProcess = () => {
  const { signer } = useMetamask()
  const { setIsModalOpen, setModalState, setModalText } = useModal()

  const votingProcess = async (
    daoAddress: string,
    votingId: number,
    voteType: VoteTypeEnum
  ) => {
    setIsModalOpen(true)

    if (!signer) {
      setModalState('error')
      setModalText('Wallet is not connected')
      return
    }

    try {
      const daoContract = DaoAbi__factory.connect(daoAddress, signer)

      setModalState('pending')
      setModalText('Waiting for wallet confirmation...')

      const createVotingTransaction = await daoContract.vote(votingId, voteType)

      setModalText('Voting...')

      await createVotingTransaction.wait()

      setModalState('success')
      setModalText('You successfully voted')
    } catch (error: any) {
      setModalState('error')
      setModalText('An error occurred while executing transaction')
      console.log('error:', error.message)
    }
  }

  return { votingProcess }
}
