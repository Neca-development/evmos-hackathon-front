import { Avatar, Button } from '@mui/material'
import * as React from 'react'

import { Paragraph } from '../typography'

export function Header() {
  const [account, setAccount] = React.useState(false)

  return (
    <header className="h-10 px-3 space-x-5 flex justify-end items-center bg-[#EDEDED]">
      {account ? (
        <>
          <Paragraph>Wallet address</Paragraph>
          <Avatar className="h-6 w-6 text-[0.65rem] bg-[#333333]">U</Avatar>
          <Button
            variant="contained"
            size="small"
            className="text-[0.65rem] text-white bg-[#333333] hover:bg-[#4e4e4e]"
            onClick={() => setAccount(false)}
          >
            Disconnect
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            size="small"
            className="text-[0.65rem] text-white bg-[#333333] hover:bg-[#4e4e4e]"
            onClick={() => setAccount(true)}
          >
            Connect
          </Button>
        </>
      )}
    </header>
  )
}
