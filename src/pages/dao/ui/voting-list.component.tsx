import type { VotingModelService } from '@entities/voting'
import { VotingUiService } from '@entities/voting'
import { List, ListItem } from '@mui/material'
import { HeadingFour, HeadingThree, MPaper } from '@shared/ui'

interface IVotingListProperties {
  daoAddress: string
  votings: VotingModelService.IVotingEntity[]
}

export function VotingList(props: IVotingListProperties) {
  const { daoAddress, votings } = props

  return (
    <>
      {votings.length > 0 ? (
        <List className="space-y-5">
          {votings.map((voting) => (
            <ListItem key={voting.id} className="p-0">
              <VotingUiService.VotingCard daoAddress={daoAddress} voting={voting} />
            </ListItem>
          ))}
        </List>
      ) : (
        <MPaper className="mb-20 space-y-2 text-center bg-grayish-blue">
          <HeadingThree className="text-orange">
            Looks like this DAO don&apos;t have votes available yet
          </HeadingThree>
          <HeadingFour>You can create one by click on button above</HeadingFour>
        </MPaper>
      )}
    </>
  )
}
