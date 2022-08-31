import { useEthers } from '@usedapp/core'
import * as React from 'react'

import { DaoAbi__factory } from '../typechain'

interface IVotingInfo {
  status: number | null
  isUserVoted: boolean
  positiveVotesAmount: number
  negativeVotesAmount: number
}

const initialVotingInfo: IVotingInfo = {
  status: null,
  isUserVoted: false,
  positiveVotesAmount: 0,
  negativeVotesAmount: 0,
}

export const useVotingInfo = (daoAddress: string | undefined, votingId: number) => {
  const [votingInfo, setVotingInfo] = React.useState(initialVotingInfo)

  const { library, account } = useEthers()

  React.useEffect(() => {
    async function getVotingInfo() {
      if (!library || !account || !daoAddress) {
        console.log('error: wallet is not connected')
        return
      }

      const signer = library.getSigner()
      const daoContract = DaoAbi__factory.connect(daoAddress, signer)

      try {
        const { status } = await daoContract.votes(votingId)
        const isUserVoted = await daoContract.hasVote(account, votingId)
        const { positiveVote, negativeVote } = await daoContract.votesInfo(votingId)

        setVotingInfo({
          status,
          isUserVoted,
          positiveVotesAmount: +positiveVote,
          negativeVotesAmount: +negativeVote,
        })
      } catch (error: any) {
        console.error(error)
      }
    }
    getVotingInfo()
  }, [daoAddress, votingId, account])

  return { votingInfo }
}
