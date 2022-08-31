import type { IVotingEntity } from '@entities/voting'
import { VotingApi } from '@entities/voting'
import { HeadingThree, MButton, MPaper, Paragraph } from '@shared/ui'

import { VotingRadioGroup } from './voting-radio-group.component'
import { VotingStatus } from './voting-status.component'

interface IVotingCardProperties {
  voting: IVotingEntity
}

export function VotingCard({ voting }: IVotingCardProperties) {
  const { data } = VotingApi.useGetInfoFromIpfsQuery({ ipfsUrl: voting.ipfsUrl })

  return (
    <MPaper className="w-full space-y-3">
      <div className="flex justify-between items-center">
        <HeadingThree className="text-orange">{data?.question}</HeadingThree>
        <VotingStatus status="Active" />
      </div>

      <Paragraph>{data?.descr}</Paragraph>

      <VotingRadioGroup />

      <div className="flex justify-between items-center">
        <Paragraph>1200 votes</Paragraph>
        <MButton>Vote</MButton>
      </div>
    </MPaper>
  )
}
