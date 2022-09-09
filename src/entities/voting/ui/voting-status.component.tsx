import { VotingStatusEnum } from '@blockchain/lib'
import { Paper } from '@mui/material'
import classNames from 'classnames'

interface IVotingStatusProperties {
  status: number | null
}

export function VotingStatus({ status }: IVotingStatusProperties) {
  return (
    <Paper
      className={classNames(
        'w-[4rem] py-[0.2rem] capitalize text-center text-[0.7rem] font-bold',
        status === VotingStatusEnum.ACTIVE && 'text-active bg-active-light',
        status === VotingStatusEnum.INACTIVE && 'text-inactive bg-inactive-light'
      )}
    >
      {status === VotingStatusEnum.ACTIVE && 'Active'}
      {status === VotingStatusEnum.INACTIVE && 'Inactive'}
    </Paper>
  )
}
