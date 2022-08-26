import { Avatar } from '@mui/material'
import { HeadingOne, Paragraph } from '@shared/ui'
import { useEthers } from '@usedapp/core'

export function ProfileHero() {
  const { account } = useEthers()

  return (
    <div className="pt-[6rem] pb-5 px-[7rem] space-y-1 block bg-profile-hero">
      <Avatar className="h-12 w-12 bg-white">
        <img src="/assets/images/metamask.svg" alt="" />
      </Avatar>
      <HeadingOne>Unnamed</HeadingOne>
      <div className="space-x-1 flex">
        <img src="/assets/images/ethereum.svg" alt="" />
        <Paragraph>{account}</Paragraph>
      </div>
    </div>
  )
}
