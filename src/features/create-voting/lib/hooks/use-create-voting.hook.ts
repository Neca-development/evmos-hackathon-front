import { VotingApi } from '@entities/voting'
import type { IVotingForm } from '@features/create-voting/model'
import { useModal } from '@shared/lib'
import * as React from 'react'
import { useCreateVotingSc } from 'src/blockchain'

export const useCreateVoting = (votingForm: IVotingForm, daoAddress: string) => {
  const [isVotingCreated, setIsVotingCreated] = React.useState(false)
  const [votingInfoLink, setVotingInfoLink] = React.useState('')

  const { setModalState, setModalText } = useModal()

  const [generateIpfsLink] = VotingApi.useGenerateIpfsLinkMutation()
  const { votingId, createVotingSc } = useCreateVotingSc(daoAddress)

  const createVoting = async () => {
    try {
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

  const [createVotingOnBackend] = VotingApi.useCreateVotingMutation()

  React.useEffect(() => {
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
