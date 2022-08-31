import type { IVotingEntity } from '@entities/voting'
import { VotingApi } from '@entities/voting'
import { HeadingThree, MButton, MPaper, Paragraph } from '@shared/ui'
import * as React from 'react'
import { useVotingProcess, VotingStatusEnum } from 'src/blockchain'
import { useVotingInfo } from 'src/blockchain/api/use-voting-info.hook'

import { VotingRadioGroup } from './voting-radio-group.component'
import { VotingResults } from './voting-results.component'
import { VotingStatus } from './voting-status.component'

interface IVotingCardProperties {
  daoAddress: string
  voting: IVotingEntity
}

export function VotingCard(props: IVotingCardProperties) {
  const { daoAddress, voting } = props
  const { ipfsUrl, smartContractId } = voting

  const [selectedVote, setSelectedVote] = React.useState('')

  const { data } = VotingApi.useGetInfoFromIpfsQuery({ ipfsUrl })
  const { votingInfo } = useVotingInfo(daoAddress, smartContractId)
  const { status, isUserVoted, positiveVotesAmount, negativeVotesAmount } = votingInfo

  const totalVotes = positiveVotesAmount + negativeVotesAmount
  const positiveVotesPercents = totalVotes ? (positiveVotesAmount / totalVotes) * 100 : 0
  const negativeVotesPercents = totalVotes ? (negativeVotesAmount / totalVotes) * 100 : 0

  const { votingProcess } = useVotingProcess()

  const handleClickOnVoteButton = () => {
    votingProcess(daoAddress, smartContractId, +selectedVote)
  }

  const handleRadioChange = (value: string) => setSelectedVote(value)

  return (
    <MPaper className="w-full space-y-3">
      <div className="flex justify-between items-center">
        <HeadingThree className="text-orange">{data?.question}</HeadingThree>
        <VotingStatus status={status} />
      </div>

      <Paragraph>{data?.descr}</Paragraph>

      {isUserVoted || status === VotingStatusEnum.INACTIVE ? (
        <VotingResults
          positiveVotesPercents={positiveVotesPercents}
          negativeVotesPercents={negativeVotesPercents}
        />
      ) : (
        <VotingRadioGroup onChange={handleRadioChange} />
      )}

      <div className="flex justify-between items-center">
        <Paragraph>{totalVotes} votes</Paragraph>
        <MButton disabled={!selectedVote} onClick={handleClickOnVoteButton}>
          Vote
        </MButton>
      </div>
    </MPaper>
  )
}
