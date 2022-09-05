import '@shared/styles/global.scss'

import { ModalProvider } from '@shared/lib'
import { store } from '@shared/store'
import { ProcessingModal } from '@shared/ui'
import type { Config } from '@usedapp/core'
import { DAppProvider, useEthers } from '@usedapp/core'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import {
  DAO_FACTORY_ADDRESS,
  EVMOS_TESTNET_CHAINID,
  EVMOS_TESTNET_RPC_URL,
} from 'src/blockchain'

/* Evmos Testnet */
const config: Config = {
  readOnlyChainId: EVMOS_TESTNET_CHAINID,
  readOnlyUrls: {
    [EVMOS_TESTNET_CHAINID]: EVMOS_TESTNET_RPC_URL,
  },
  multicallAddresses: {
    [EVMOS_TESTNET_CHAINID]: DAO_FACTORY_ADDRESS,
  },
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { account, isLoading } = useEthers()

  const router = useRouter()
  const { asPath } = router
  const isHomePage = asPath === '/'

  useEffect(() => {
    if (!account && !isLoading && !isHomePage) {
      router.push('/')
    }
  }, [account, isHomePage])

  return (
    <DAppProvider config={config}>
      <Provider store={store}>
        <ModalProvider>
          <Component {...pageProps} />
          <ProcessingModal />
        </ModalProvider>
      </Provider>
    </DAppProvider>
  )
}

export default MyApp
