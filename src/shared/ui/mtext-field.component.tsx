import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MTextField = styled(TextField)({
  '& label.Mui-focused': {
    fontSize: '0.6rem',
    color: '#D33D00',
  },
  '& .MuiFormLabel-root': {
    fontSize: '0.6rem',
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: '0.6rem',
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(137, 129, 129, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(211, 61, 0, 0.6)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D33D00',
    },
  },
})
