import type { IVotingEntity } from '@entities/voting'
import { List, ListItem } from '@mui/material'

import { VotingCard } from './voting-card.component'

interface IVotingListProperties {
  daoAddress: string | undefined
  votings: IVotingEntity[] | undefined
}

export function VotingList(props: IVotingListProperties) {
  const { daoAddress, votings } = props

  return (
    <>
      {daoAddress && votings != null && (
        <List className="space-y-5">
          {votings.map((voting) => (
            <ListItem key={voting.id} className="p-0">
              <VotingCard daoAddress={daoAddress} voting={voting} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}
