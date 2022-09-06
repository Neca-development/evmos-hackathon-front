import { MButton } from '@shared/ui'
import { useEthers } from '@usedapp/core'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import * as React from 'react'
import { switchToEvmosNetwork } from 'src/blockchain/lib/helpers'

import styles from './index.module.scss'

export default function HomePage() {
  const { activateBrowserWallet } = useEthers()
  const router = useRouter()

  React.useEffect(() => {
    router.prefetch('/profile')
  }, [])

  const connectWallet = async () => {
    try {
      await switchToEvmosNetwork()
      await activateBrowserWallet()
      router.push('/profile')
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <main
      className={classNames(
        'h-screen w-full px-14',
        'flex flex-col justify-center',
        'bg-homepage bg-cover bg-center bg-no-repeat'
      )}
    >
      <div className="w-[30rem]">
        <h1
          className={classNames(
            'mb-6',
            'font-red-hat-display text-5xl leading-snug uppercase text-transparent',
            styles.title
          )}
        >
          BECOME THE PART OF VOTERS POWER
        </h1>

        <p className="w-[20rem] mb-12 text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <div>
          <MButton onClick={connectWallet}>Connect Metamask</MButton>
        </div>
      </div>
    </main>
  )
}
