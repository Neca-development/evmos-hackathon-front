import { HeadingThree, MButton, MPaper, Paragraph } from '@shared/ui'

import { VoteRadioGroup } from './vote-radio-group.component'
import { VoteStatus } from './vote-status.component'

interface IVoteCardProperties {
  vote: {
    question: string
    description: string
    status: string
  }
}

export function VoteCard({ vote }: IVoteCardProperties) {
  return (
    <MPaper className="space-y-3">
      <div className="flex justify-between items-center">
        <HeadingThree className="text-orange">{vote.question}</HeadingThree>
        <VoteStatus status={vote.status} />
      </div>

      <Paragraph>{vote.description}</Paragraph>

      <VoteRadioGroup />

      <div className="flex justify-between items-center">
        <Paragraph>1200 votes</Paragraph>
        <MButton>Vote</MButton>
      </div>
    </MPaper>
  )
}
