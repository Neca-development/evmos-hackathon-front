import { Button, TextField } from '@mui/material'
import { MPaper } from '@shared/ui'
import * as React from 'react'
import { useCreateVoting } from 'src/blockchain'

interface ICreateVotingFormProperties {
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

export function CreateVotingForm({ onCancel }: ICreateVotingFormProperties) {
  const [votingForm, setVotingForm] =
    React.useState<IVotingFormProperties>(votingFormInitialState)

  const { createVoting } = useCreateVoting()

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setVotingForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleClickOnCreateButton = async () => {
    try {
      console.log(votingForm)
      await createVoting()
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <MPaper className="flex flex-col justify-between space-y-3">
      <TextField
        InputLabelProps={{ className: 'text-xs text-white' }}
        InputProps={{ className: 'text-xs text-white' }}
        name="question"
        label="Voting question"
        onChange={handleInput}
      />

      <TextField
        InputLabelProps={{ className: 'text-xs text-white' }}
        InputProps={{ className: 'text-xs text-white' }}
        name="description"
        label="Voting description"
        multiline
        minRows={6}
        onChange={handleInput}
      />

      <div className="flex justify-between items-center">
        <Button
          variant="contained"
          size="small"
          className="text-[0.65rem] text-white bg-orange"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          size="small"
          className="text-[0.65rem] text-white bg-orange"
          onClick={handleClickOnCreateButton}
        >
          Create voting
        </Button>
      </div>
    </MPaper>
  )
}
