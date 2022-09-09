import { Avatar, Skeleton } from '@mui/material'
import { formatAddress } from '@shared/lib/utils'
import { EthereumIcon, HeadingOne, MetamaskIcon, Paragraph } from '@shared/ui'
import { useEthers } from '@usedapp/core'

export function ProfileHero() {
  const { account, isLoading } = useEthers()

  return (
    <div className="pt-[6rem] pb-5 px-[7rem] space-y-1 block bg-profile-hero">
      {isLoading ? (
        <>
          <Skeleton variant="circular" className="h-12 w-12 bg-light-gray" />
          <Skeleton className="w-[10rem] text-xl bg-light-gray" />
          <Skeleton className="w-[7rem] text-[0.6rem] bg-light-gray" />
        </>
      ) : (
        <>
          <Avatar className="h-12 w-12 bg-white">
            <MetamaskIcon />
          </Avatar>

          <HeadingOne>Unnamed</HeadingOne>

          <div className="space-x-1 flex items-center">
            <EthereumIcon />
            {account && <Paragraph>{formatAddress(account)}</Paragraph>}
          </div>
        </>
      )}
    </div>
  )
}
