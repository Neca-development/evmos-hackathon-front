import { Avatar, Skeleton } from '@mui/material'
import { formatAddress } from '@shared/lib/utils'
import { useEthers } from '@usedapp/core'
import Link from 'next/link'
import * as React from 'react'

import { MetamaskIcon } from './icons/metamask.icon'
import { Paragraph } from './typography'

export function Header() {
  const { account, isLoading } = useEthers()

  return (
    <header className="h-10 px-[7rem] flex justify-end items-center">
      {isLoading && (
        <div className="space-x-3 flex items-center">
          <Skeleton className="w-[5rem] text-[0.6rem] bg-light-gray" />
          <Skeleton variant="circular" className="h-6 w-6 bg-light-gray" />
        </div>
      )}

      {account && (
        <Link href="/profile">
          <a className="space-x-3 flex items-center text-white">
            <Paragraph>{formatAddress(account)}</Paragraph>
            <Avatar className="h-6 w-6 bg-white">
              <MetamaskIcon className="w-2/3" />
            </Avatar>
          </a>
        </Link>
      )}
    </header>
  )
}
