import { switchToEvmosNetwork, useMetamask } from '@blockchain/lib'
import { useModal } from '@shared/lib'
import { MButton } from '@shared/ui'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import * as React from 'react'

import styles from './index.module.scss'

export default function HomePage() {
  const router = useRouter()

  React.useEffect(() => {
    router.prefetch('/profile')
  }, [])

  const { connectWallet } = useMetamask()
  const { setIsModalOpen, setModalState, setModalText } = useModal()

  const handleClickOnConnectButton = async () => {
    try {
      if (!connectWallet) {
        return
      }
      await switchToEvmosNetwork()
      await connectWallet()
      router.push('/profile')
    } catch (error: any) {
      setIsModalOpen(true)
      setModalState('error')
      setModalText(error.message)
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
          <MButton onClick={handleClickOnConnectButton}>Connect Metamask</MButton>
        </div>
      </div>
    </main>
  )
}
