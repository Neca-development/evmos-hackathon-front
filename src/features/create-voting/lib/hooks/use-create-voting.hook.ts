import { useCreateVotingSc } from '@blockchain/api'
import { VotingApiService } from '@entities/voting'
import type { IVotingForm } from '@features/create-voting/model'
import { useModal } from '@shared/lib'
import { useEffect, useState } from 'react'

export const useCreateVoting = (votingForm: IVotingForm, daoAddress: string) => {
  const [isVotingCreated, setIsVotingCreated] = useState(false)
  const [votingInfoLink, setVotingInfoLink] = useState('')

  const { setIsModalOpen, setModalState, setModalText } = useModal()

  const [generateIpfsLink] = VotingApiService.useGenerateIpfsLinkMutation()
  const { votingId, createVotingSc } = useCreateVotingSc(daoAddress)

  const createVoting = async () => {
    try {
      setIsModalOpen(true)
      setModalState('pending')
      setModalText('Uploading voting info to IPFS...')

      const ipfsLink = await generateIpfsLink({
        question: votingForm.question,
        descr: votingForm.description,
      }).unwrap()
      setVotingInfoLink(ipfsLink)

      await createVotingSc()
    } catch (error: any) {
      console.error(error)
    }
  }

  const [createVotingOnBackend] = VotingApiService.useCreateVotingMutation()

  useEffect(() => {
    async function finishVotingCreation() {
      if (votingId != null && votingInfoLink) {
        try {
          await createVotingOnBackend({
            daoAddress,
            ipfsUrl: votingInfoLink,
            smartContractId: votingId,
          })

          setIsVotingCreated(true)
          setModalState('success')
          setModalText('You successfully created new voting')
        } catch (error: any) {
          setModalState('error')
          setModalText(error.message)
        }
      }
    }
    finishVotingCreation()
  }, [votingId, votingInfoLink])

  return { isVotingCreated, createVoting }
}
