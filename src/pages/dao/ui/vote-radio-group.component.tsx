import { FormControl, FormControlLabel, RadioGroup } from '@mui/material'

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
        <div className="h-[2px] w-full bg-light-gray" />
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
