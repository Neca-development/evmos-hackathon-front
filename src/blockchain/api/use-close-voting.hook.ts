import { useMetamask } from '@blockchain/lib'
import { useModal } from '@shared/lib'

import { DaoAbi__factory } from '../typechain'

export const useCloseVoting = () => {
  const { signer } = useMetamask()
  const { setIsModalOpen, setModalState, setModalText } = useModal()

  const closeVoting = async (daoAddress: string, votingId: number) => {
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

      const closeVotingTransaction = await daoContract.closeVoting(votingId)

      setModalText('Closing the voting...')

      await closeVotingTransaction.wait()

      setModalState('success')
      setModalText('Voting have been successfully closed')
    } catch (error: any) {
      setModalState('error')
      setModalText('An error occurred while executing transaction')
      console.log(error)
    }
  }

  return { closeVoting }
}
