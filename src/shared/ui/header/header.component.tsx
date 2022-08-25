import { Avatar, Button } from '@mui/material'
import { useEthers } from '@usedapp/core'
import * as React from 'react'

import { Paragraph } from '../typography'

export function Header() {
  const { account, activateBrowserWallet, deactivate } = useEthers()

  const walletAddress = React.useMemo(
    () => `${account?.slice(0, 4)}...${account?.slice(-6, account?.length)}`,
    [account]
  )

  return (
    <header className="h-10 px-3 space-x-5 flex justify-end items-center">
      {account ? (
        <>
          <Paragraph>{walletAddress}</Paragraph>
          <Avatar className="h-6 w-6 text-[0.65rem] text-gray bg-white">U</Avatar>
          <Button
            variant="contained"
            size="small"
            className="text-[0.65rem] text-white bg-orange"
            onClick={deactivate}
          >
            Disconnect
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            size="small"
            className="text-[0.65rem] text-white bg-orange"
            onClick={activateBrowserWallet}
          >
            Connect
          </Button>
        </>
      )}
    </header>
  )
}
