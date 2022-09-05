import type { IVotingEntity } from '@entities/voting'
import { VotingApi } from '@entities/voting'
import { HeadingThree, MButton, MPaper, Paragraph, ProcessingModal } from '@shared/ui'
import * as React from 'react'
import { useVotingProcess, VoteTypeEnum, VotingStatusEnum } from 'src/blockchain'
import { useVotingInfo } from 'src/blockchain/api/use-voting-info.hook'

import { VotingCardSkeleton } from './voting-card-skeleton.component'
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
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const { data } = VotingApi.useGetInfoFromIpfsQuery({ ipfsUrl })
  const { votingInfo, refetch } = useVotingInfo(daoAddress, smartContractId)
  const { status, isUserVoted, userVoteType, positiveVotesAmount, negativeVotesAmount } =
    votingInfo

  const isLoading = !data || status == null

  const totalVotes = positiveVotesAmount + negativeVotesAmount
  const positiveVotesPercents = totalVotes ? (positiveVotesAmount / totalVotes) * 100 : 0
  const negativeVotesPercents = totalVotes ? (negativeVotesAmount / totalVotes) * 100 : 0

  const { votingProcess } = useVotingProcess()

  const handleClickOnVoteButton = async () => {
    setIsModalOpen(true)
    await votingProcess(daoAddress, smartContractId, +selectedVote)
    refetch()
  }

  const handleRadioChange = (value: string) => setSelectedVote(value)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {isLoading ? (
        <VotingCardSkeleton />
      ) : (
        <MPaper className="w-full space-y-3">
          <div className="space-x-14 flex justify-between items-center">
            <HeadingThree className="text-orange">{data.question}</HeadingThree>
            <div>
              <VotingStatus status={status} />
            </div>
          </div>

          <Paragraph>{data.descr}</Paragraph>

          {isUserVoted || status === VotingStatusEnum.INACTIVE ? (
            <>
              <VotingResults
                label="Yes"
                percents={positiveVotesPercents}
                isUserVoted={isUserVoted && userVoteType === VoteTypeEnum.POSITIVE}
              />
              <VotingResults
                label="No"
                percents={negativeVotesPercents}
                isUserVoted={isUserVoted && userVoteType === VoteTypeEnum.NEGATIVE}
              />
            </>
          ) : (
            <VotingRadioGroup onChange={handleRadioChange} />
          )}

          <div className="flex justify-between items-center">
            <Paragraph>{totalVotes} votes</Paragraph>
            <MButton
              disabled={!selectedVote || isUserVoted}
              onClick={handleClickOnVoteButton}
            >
              Vote
            </MButton>
          </div>
        </MPaper>
      )}

      <ProcessingModal onClose={handleModalClose} />
    </>
  )
}
