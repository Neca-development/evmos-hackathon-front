import type { IVotingEntity } from '@entities/voting'
import { List, ListItem } from '@mui/material'

import { VotingCard } from './voting-card.component'

interface IVotingListProperties {
  votings: IVotingEntity[] | undefined
}

export function VotingList({ votings }: IVotingListProperties) {
  return (
    <>
      {votings != null && (
        <List className="space-y-5">
          {votings.map((voting) => (
            <ListItem key={voting.id} className="p-0">
              <VotingCard voting={voting} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}
