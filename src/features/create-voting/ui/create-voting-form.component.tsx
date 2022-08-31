import { VotingApi } from '@entities/voting'
import { MButton, MPaper, MTextField, ProcessingModal } from '@shared/ui'
import * as React from 'react'
import { useCreateVoting } from 'src/blockchain'

interface ICreateVotingFormProperties {
  daoAddress: string | string[] | undefined
  onCancel: () => void
}

interface IVotingFormProperties {
  question: string
  description: string
}

const votingFormInitialState: IVotingFormProperties = {
  question: '',
  description: '',
}

export function CreateVotingForm(props: ICreateVotingFormProperties) {
  const { daoAddress, onCancel } = props

  const [votingForm, setVotingForm] =
    React.useState<IVotingFormProperties>(votingFormInitialState)
  const [votingInfoLink, setVotingInfoLink] = React.useState('')

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalText, setModalText] = React.useState('')
  const [isRequestInProgress, setIsRequestInProgress] = React.useState(false)
  const [isDaoCreated, setIsDaoCreated] = React.useState(false)

  const [generateIpfsLink] = VotingApi.useGenerateIpfsLinkMutation()
  const [createVotingOnBackend] = VotingApi.useCreateVotingMutation()

  const { votingId, txStatus, txMessage, createVoting } = useCreateVoting()

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setVotingForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleClickOnCreateButton = async () => {
    if (typeof daoAddress !== 'string') return

    try {
      setIsModalOpen(true)
      setIsRequestInProgress(true)
      setModalText('Uploading voting info to IPFS...')

      const ipfsLink = await generateIpfsLink({
        question: votingForm.question,
        descr: votingForm.description,
      }).unwrap()
      console.log('voting ipfs link:', ipfsLink)
      setVotingInfoLink(ipfsLink)

      setIsRequestInProgress(false)

      await createVoting(daoAddress)
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleModalClose = () => {
    if (isDaoCreated) {
      setIsModalOpen(false)
    }
  }

  React.useEffect(() => {
    async function finishVotingCreation() {
      if (typeof daoAddress === 'string' && votingId != null && votingInfoLink) {
        await createVotingOnBackend({
          daoAddress,
          ipfsUrl: votingInfoLink,
          smartContractId: votingId,
        })
        setIsDaoCreated(true)
      }
    }
    finishVotingCreation()
  }, [daoAddress, votingId, votingInfoLink])

  return (
    <>
      <MPaper className="flex flex-col justify-between space-y-5">
        <MTextField name="question" label="Voting question" onChange={handleInput} />

        <MTextField
          name="description"
          label="Voting description"
          multiline
          minRows={6}
          onChange={handleInput}
        />

        <div className="flex justify-between items-center">
          <MButton onClick={onCancel}>Cancel</MButton>
          <MButton onClick={handleClickOnCreateButton}>Create voting</MButton>
        </div>
      </MPaper>

      <ProcessingModal
        isOpen={isModalOpen}
        isProcessing={isRequestInProgress || txStatus === 'pending'}
        isSuccess={!isRequestInProgress && txStatus === 'success'}
        onClose={handleModalClose}
      >
        {isRequestInProgress ? modalText : txMessage}
      </ProcessingModal>
    </>
  )
}
