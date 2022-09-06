import type { RadioProps } from '@mui/material'
import { Radio } from '@mui/material'

export function VotingRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        marginRight: '0.3rem',
        color: 'white',
        '&.Mui-checked': {
          color: 'white',
        },
        '& .MuiSvgIcon-root': {
          fontSize: '1rem',
        },
      }}
      {...props}
    />
  )
}
