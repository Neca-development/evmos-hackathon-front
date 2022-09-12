import { useMetamask } from '@blockchain/lib'
import { Avatar, Skeleton } from '@mui/material'
import { formatAddress } from '@shared/lib/utils'
import { EthereumIcon, HeadingOne, MetamaskIcon, Paragraph } from '@shared/ui'

export function ProfileHero() {
  const { account } = useMetamask()

  return (
    <div className="pt-[6rem] pb-5 px-[7rem] space-y-1 block bg-profile-hero">
      {account ? (
        <>
          <Avatar className="h-12 w-12 p-2 bg-white">
            <MetamaskIcon />
          </Avatar>

          <HeadingOne>Unnamed</HeadingOne>

          <div className="space-x-1 flex items-center">
            <EthereumIcon />
            <Paragraph>{formatAddress(account)}</Paragraph>
          </div>
        </>
      ) : (
        <>
          <Skeleton variant="circular" className="h-12 w-12 bg-light-gray" />
          <Skeleton className="w-[10rem] text-xl bg-light-gray" />
          <Skeleton className="w-[7rem] text-[0.6rem] bg-light-gray" />
        </>
      )}
    </div>
  )
}
