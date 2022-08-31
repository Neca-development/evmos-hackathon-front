import type { IVotingEntity } from '@entities/voting'
import { VotingApi } from '@entities/voting'
import { HeadingThree, MButton, MPaper, Paragraph, ProcessingModal } from '@shared/ui'
import * as React from 'react'
import { useVotingProcess, VoteTypeEnum, VotingStatusEnum } from 'src/blockchain'
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
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const { data } = VotingApi.useGetInfoFromIpfsQuery({ ipfsUrl })
  const { votingInfo } = useVotingInfo(daoAddress, smartContractId)
  const { status, isUserVoted, userVoteType, positiveVotesAmount, negativeVotesAmount } =
    votingInfo

  const totalVotes = positiveVotesAmount + negativeVotesAmount
  const positiveVotesPercents = totalVotes ? (positiveVotesAmount / totalVotes) * 100 : 0
  const negativeVotesPercents = totalVotes ? (negativeVotesAmount / totalVotes) * 100 : 0

  const { txStatus, txMessage, votingProcess } = useVotingProcess()

  const handleClickOnVoteButton = () => {
    setIsModalOpen(true)
    votingProcess(daoAddress, smartContractId, +selectedVote)
  }

  const handleRadioChange = (value: string) => setSelectedVote(value)

  return (
    <>
      <MPaper className="w-full space-y-3">
        <div className="flex justify-between items-center">
          <HeadingThree className="text-orange">{data?.question}</HeadingThree>
          <VotingStatus status={status} />
        </div>

        <Paragraph>{data?.descr}</Paragraph>

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
          <MButton disabled={!selectedVote} onClick={handleClickOnVoteButton}>
            Vote
          </MButton>
        </div>
      </MPaper>

      <ProcessingModal
        isOpen={isModalOpen}
        isProcessing={txStatus === 'pending'}
        isSuccess={txStatus === 'success'}
        onClose={() => setIsModalOpen(false)}
      >
        {txMessage}
      </ProcessingModal>
    </>
  )
}
