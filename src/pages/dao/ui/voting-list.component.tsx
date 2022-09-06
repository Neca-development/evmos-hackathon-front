import type { VotingModelService } from '@entities/voting'
import { VotingUiService } from '@entities/voting'
import { List, ListItem } from '@mui/material'

interface IVotingListProperties {
  daoAddress: string
  votings: VotingModelService.IVotingEntity[]
}

export function VotingList(props: IVotingListProperties) {
  const { daoAddress, votings } = props

  return (
    <List className="space-y-5">
      {votings.map((voting) => (
        <ListItem key={voting.id} className="p-0">
          <VotingUiService.VotingCard daoAddress={daoAddress} voting={voting} />
        </ListItem>
      ))}
    </List>
  )
}
