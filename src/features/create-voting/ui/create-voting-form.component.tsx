import { MButton, MPaper, MTextField } from '@shared/ui'
import { useEffect } from 'react'

import { useCreateVoting, useVotingForm } from '../lib'

interface ICreateVotingFormProperties {
  daoAddress: string
  onCreate: () => void
  onCancel: () => void
}

export function CreateVotingForm(props: ICreateVotingFormProperties) {
  const { daoAddress, onCreate, onCancel } = props

  const { votingForm, handleInput } = useVotingForm()

  const { createVoting, isVotingCreated } = useCreateVoting(votingForm, daoAddress)

  useEffect(() => {
    if (isVotingCreated) {
      onCreate()
    }
  }, [isVotingCreated])

  return (
    <MPaper className="space-y-5 flex flex-col justify-between bg-dark-grayish-blue">
      <MTextField name="question" label="Voting question" onChange={handleInput} />

      <MTextField
        name="description"
        label="Voting description"
        multiline
        minRows={6}
        onChange={handleInput}
      />

      <div className="flex justify-between items-center">
        <MButton variant="secondary" onClick={onCancel}>
          Cancel
        </MButton>
        <MButton onClick={createVoting}>Create voting</MButton>
      </div>
    </MPaper>
  )
}
