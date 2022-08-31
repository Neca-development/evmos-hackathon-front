import { MButton, MPaper, MTextField } from '@shared/ui'
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

  const { createVoting } = useCreateVoting()

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setVotingForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleClickOnCreateButton = async () => {
    if (typeof daoAddress !== 'string') return

    try {
      console.log(votingForm)
      await createVoting(daoAddress)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
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
  )
}
