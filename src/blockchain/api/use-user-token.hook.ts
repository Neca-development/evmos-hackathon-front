import { useMetamask } from '@blockchain/lib'
import * as React from 'react'

import { DaoAbi__factory } from '../typechain'

export const useUserToken = (daoAddress: string | undefined) => {
  const [tokenIpfsUrl, setTokenIpfsUrl] = React.useState('')

  const { signer, account } = useMetamask()

  React.useEffect(() => {
    async function fetchUserTokenInfo() {
      if (!signer || !account || !daoAddress) {
        console.error('Unable to get token info')
        return
      }

      const daoContract = DaoAbi__factory.connect(daoAddress, signer)

      try {
        const tokenId = await daoContract.tokenForOwner(account)
        const ipfsUrl = await daoContract.tokenURI(tokenId)
        setTokenIpfsUrl(ipfsUrl)
      } catch (error: any) {
        console.error(error)
      }
    }
    fetchUserTokenInfo()
  }, [daoAddress, signer, account])

  return { tokenIpfsUrl }
}
