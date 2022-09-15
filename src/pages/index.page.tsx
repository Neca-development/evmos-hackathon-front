import { switchToEvmosNetwork, useMetamask } from '@blockchain/lib'
import { useModal } from '@shared/lib'
import { MButton } from '@shared/ui'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import styles from './index.module.scss'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/profile')
  }, [router])

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
        <p className={classNames('mb-4', styles.title)}>CosDAO</p>

        <h1
          className={classNames(
            'mb-12',
            'font-red-hat-display text-3xl leading-snug text-transparent',
            styles.title
          )}
        >
          The first no-code solution to create a DAO on the Evmos blockchain
        </h1>

        <div>
          <MButton onClick={handleClickOnConnectButton}>Connect Metamask</MButton>
        </div>
      </div>
    </main>
  )
}
