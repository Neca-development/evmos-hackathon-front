import { Avatar } from '@mui/material'
import { HeadingOne, Paragraph } from '@shared/ui'

export function ProfileHero() {
  return (
    <div className="pt-[6rem] pb-5 px-[7rem] space-y-1 block bg-profile-hero">
      <Avatar className="h-12 w-12 bg-white">
        <img src="/assets/images/metamask.svg" alt="" />
      </Avatar>
      <HeadingOne>Unnamed</HeadingOne>
      <div className="space-x-1 flex">
        <img src="/assets/images/ethereum.svg" alt="" />
        <Paragraph>Wallet address</Paragraph>
      </div>
    </div>
  )
}
