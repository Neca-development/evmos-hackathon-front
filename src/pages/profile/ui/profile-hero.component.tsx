import { Avatar } from '@mui/material'
import { HeadingOne, Paragraph } from '@shared/ui'
import { EthereumIcon } from '@shared/ui/icons/ethereum.icon'
import { MetamaskIcon } from '@shared/ui/icons/metamask.icon'
import { formatAddress } from '@shared/utils'
import { useEthers } from '@usedapp/core'

export function ProfileHero() {
  const { account } = useEthers()

  return (
    <div className="pt-[6rem] pb-5 px-[7rem] space-y-1 block bg-profile-hero">
      <Avatar className="h-12 w-12 bg-white">
        <MetamaskIcon />
      </Avatar>
      <HeadingOne>Unnamed</HeadingOne>
      <div className="space-x-1 flex">
        <EthereumIcon />
        {account && <Paragraph>{formatAddress(account)}</Paragraph>}
      </div>
    </div>
  )
}
