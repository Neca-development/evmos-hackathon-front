import type { IVotingForm } from '@features/create-voting/model'
import React from 'react'

import { INITIAL_STATE } from '../constants'

export const useVotingForm = () => {
  const [votingForm, setVotingForm] = React.useState<IVotingForm>(INITIAL_STATE)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setVotingForm((previous) => ({ ...previous, [name]: value }))
  }

  const resetVotingForm = () => {
    setVotingForm(INITIAL_STATE)
  }

  return { votingForm, handleInput, resetVotingForm }
}
