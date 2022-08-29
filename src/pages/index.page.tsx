import { Header, HeadingOne, MainContainer, MButton } from '@shared/ui'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function HomePage() {
  const { activateBrowserWallet } = useEthers()
  const router = useRouter()

  React.useEffect(() => {
    router.prefetch('/profile')
  }, [])

  const connectWallet = async () => {
    await activateBrowserWallet()
    router.push('/profile')
  }

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header />

        <MainContainer className="flex-grow space-y-3 flex flex-col justify-center items-center">
          <HeadingOne>Evmos Hackathon</HeadingOne>
          <MButton onClick={connectWallet}>Connect wallet</MButton>
        </MainContainer>
      </div>
    </>
  )
}
