import { Paper } from '@mui/material'
import classNames from 'classnames'

interface IVoteStatusProperties {
  status: string
}

export function VoteStatus({ status }: IVoteStatusProperties) {
  return (
    <Paper
      className={classNames(
        'w-[4rem] py-[0.2rem] capitalize text-center text-[0.7rem] font-bold',
        status === 'active' && 'text-active bg-active-light',
        status === 'inactive' && 'text-inactive bg-inactive-light'
      )}
    >
      {status}
    </Paper>
  )
}
