import { FormControl, FormControlLabel, RadioGroup } from '@mui/material'
import { MDivider } from '@shared/ui'

import { VoteRadio } from './vote-radio.component'

export function VoteRadioGroup() {
  return (
    <FormControl className="w-full">
      <RadioGroup name="vote" className="space-y-1">
        <FormControlLabel
          value="yes"
          control={<VoteRadio />}
          label="Yes"
          componentsProps={{ typography: { className: 'text-xs' } }}
        />
        <MDivider />
        <FormControlLabel
          value="no"
          control={<VoteRadio />}
          label="No"
          componentsProps={{ typography: { className: 'text-xs' } }}
        />
      </RadioGroup>
    </FormControl>
  )
}
