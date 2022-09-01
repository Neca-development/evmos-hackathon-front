import { useEthers } from '@usedapp/core'
import * as React from 'react'

import { DaoAbi__factory } from '../typechain'

export const useUserToken = (daoAddress: string | undefined) => {
  const [tokenIpfsUrl, setTokenIpfsUrl] = React.useState('')

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
        const tokenId = await daoContract.tokenForOwner(account)
        console.log('token id:', +tokenId)
        const ipfsUrl = await daoContract.tokenURI(tokenId)
        setTokenIpfsUrl(ipfsUrl)
      } catch (error: any) {
        console.error(error)
      }
    }
    getVotingInfo()
  }, [daoAddress, account])

  return { tokenIpfsUrl }
}
