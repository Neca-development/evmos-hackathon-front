import { FormControl, FormControlLabel, RadioGroup } from '@mui/material'
import { MDivider } from '@shared/ui'

import { VotingRadio } from './voting-radio.component'

export function VotingRadioGroup() {
  return (
    <FormControl className="w-full">
      <RadioGroup name="vote" className="space-y-1">
        <FormControlLabel
          value="yes"
          control={<VotingRadio />}
          label="Yes"
          componentsProps={{ typography: { className: 'text-xs' } }}
        />
        <MDivider />
        <FormControlLabel
          value="no"
          control={<VotingRadio />}
          label="No"
          componentsProps={{ typography: { className: 'text-xs' } }}
        />
      </RadioGroup>
    </FormControl>
  )
}
