import { Avatar } from '@mui/material'
import { useEthers } from '@usedapp/core'
import Link from 'next/link'
import * as React from 'react'

import { MetamaskIcon } from './icons/metamask.icon'
import { Paragraph } from './typography'

export function Header() {
  const { account } = useEthers()

  const walletAddress = React.useMemo(
    () => `${account?.slice(0, 4)}...${account?.slice(-6, account?.length)}`,
    [account]
  )
  return (
    <header className="h-10 px-[7rem] flex justify-end items-center">
      {account && (
        <Link href="/profile">
          <a className="space-x-3 flex items-center text-white">
            <Paragraph>{walletAddress}</Paragraph>
            <Avatar className="h-6 w-6 bg-white">
              <MetamaskIcon className="w-2/3" />
            </Avatar>
          </a>
        </Link>
      )}
    </header>
  )
}
