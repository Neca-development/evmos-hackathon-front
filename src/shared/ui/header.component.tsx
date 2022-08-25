import { Avatar } from '@mui/material'
import { useEthers } from '@usedapp/core'
import * as React from 'react'

import { Paragraph } from './typography'

export function Header() {
  const { account } = useEthers()

  const walletAddress = React.useMemo(
    () => `${account?.slice(0, 4)}...${account?.slice(-6, account?.length)}`,
    [account]
  )

  return (
    <header className="h-10 px-[7rem] space-x-3 flex justify-end items-center">
      {account && (
        <>
          <Paragraph>{walletAddress}</Paragraph>
          <Avatar className="h-6 w-6 bg-white">
            <img src="/assets/images/metamask.svg" alt="" className="w-2/3" />
          </Avatar>
        </>
      )}
    </header>
  )
}
