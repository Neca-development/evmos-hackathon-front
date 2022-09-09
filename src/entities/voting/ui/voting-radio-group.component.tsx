import { VoteTypeEnum } from '@blockchain/lib'
import { FormControl, FormControlLabel, RadioGroup } from '@mui/material'
import { MDivider } from '@shared/ui'
import * as React from 'react'

import { VotingRadio } from './voting-radio.component'

interface IVotingRadioGroupProperties {
  onChange: (value: string) => void
}

export function VotingRadioGroup({ onChange }: IVotingRadioGroupProperties) {
  const onRadioChange = (event: React.SyntheticEvent) => {
    const { value } = event.target as HTMLInputElement
    onChange(value)
  }

  return (
    <FormControl className="w-full">
      <RadioGroup className="space-y-1">
        <FormControlLabel
          value={VoteTypeEnum.POSITIVE}
          control={<VotingRadio />}
          label="Yes"
          componentsProps={{ typography: { className: 'text-xs' } }}
          onChange={onRadioChange}
        />
        <MDivider />
        <FormControlLabel
          value={VoteTypeEnum.NEGATIVE}
          control={<VotingRadio />}
          label="No"
          componentsProps={{ typography: { className: 'text-xs' } }}
          onChange={onRadioChange}
        />
      </RadioGroup>
    </FormControl>
  )
}
