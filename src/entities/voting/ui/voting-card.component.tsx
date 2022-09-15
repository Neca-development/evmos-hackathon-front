import { useVotingInfo, useVotingProcess } from '@blockchain/api'
import { useCloseVoting } from '@blockchain/api/use-close-voting.hook'
import { useMetamask, VoteTypeEnum, VotingStatusEnum } from '@blockchain/lib'
import { HeadingThree, MButton, MPaper, Paragraph, VotingCardSkeleton } from '@shared/ui'
import { useState } from 'react'

import { useGetInfoFromIpfsQuery } from '../api'
import type { IVotingEntity } from '../model'
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

  const [selectedVote, setSelectedVote] = useState('')

  const { data } = useGetInfoFromIpfsQuery({ ipfsUrl })
  const { votingInfo, refetch } = useVotingInfo(daoAddress, smartContractId)
  const {
    owner,
    status,
    isUserVoted,
    userVoteType,
    positiveVotesAmount,
    negativeVotesAmount,
  } = votingInfo

  const isLoading = !data || status == null

  const totalVotes = positiveVotesAmount + negativeVotesAmount
  const positiveVotesPercents = totalVotes ? (positiveVotesAmount / totalVotes) * 100 : 0
  const negativeVotesPercents = totalVotes ? (negativeVotesAmount / totalVotes) * 100 : 0

  const { votingProcess } = useVotingProcess()

  const handleClickOnVoteButton = async () => {
    await votingProcess(daoAddress, smartContractId, +selectedVote)
    refetch()
  }

  const handleRadioChange = (value: string) => setSelectedVote(value)

  const { account } = useMetamask()
  const { closeVoting } = useCloseVoting()

  const handleCloseVoting = async () => {
    await closeVoting(daoAddress, smartContractId)
    refetch()
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
            {status === VotingStatusEnum.ACTIVE && (
              <>
                {isUserVoted && owner === account ? (
                  <MButton onClick={handleCloseVoting}>Close voting</MButton>
                ) : (
                  <MButton
                    disabled={!selectedVote || isUserVoted}
                    onClick={handleClickOnVoteButton}
                  >
                    Vote
                  </MButton>
                )}
              </>
            )}
          </div>
        </MPaper>
      )}
    </>
  )
}
