import { useMetamask } from '@blockchain/lib'
import { useEffect, useState } from 'react'

import type { VoteTypeEnum } from '../lib'
import { DaoAbi__factory } from '../typechain'

interface IVotingInfo {
  owner: string
  status: number | null
  isUserVoted: boolean
  userVoteType: VoteTypeEnum
  positiveVotesAmount: number
  negativeVotesAmount: number
}

const initialVotingInfo: IVotingInfo = {
  owner: '',
  status: null,
  isUserVoted: false,
  userVoteType: 0,
  positiveVotesAmount: 0,
  negativeVotesAmount: 0,
}

export const useVotingInfo = (daoAddress: string | undefined, votingId: number) => {
  const [votingInfo, setVotingInfo] = useState(initialVotingInfo)

  const { signer, account } = useMetamask()

  const fetchVotingInfo = async () => {
    if (!signer || !account || !daoAddress) {
      console.error('wallet is not connected')
      return
    }

    try {
      const daoContract = DaoAbi__factory.connect(daoAddress, signer)

      const { ownerVoting, status } = await daoContract.votes(votingId)
      const isUserVoted = await daoContract.hasVote(account, votingId)
      const userVoteType = await daoContract.voteTypes(account, votingId)
      const { positiveVote, negativeVote } = await daoContract.votesInfo(votingId)

      setVotingInfo({
        owner: ownerVoting,
        status,
        isUserVoted,
        userVoteType,
        positiveVotesAmount: +positiveVote,
        negativeVotesAmount: +negativeVote,
      })
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchVotingInfo()
  }, [daoAddress, votingId, account])

  return { votingInfo, refetch: fetchVotingInfo }
}
