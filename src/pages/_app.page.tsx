import '@shared/styles/global.scss'

import { store } from '@shared/store'
import type { Config } from '@usedapp/core'
import { DAppProvider } from '@usedapp/core'
import type { AppProps } from 'next/app'
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
  return (
    <DAppProvider config={config}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </DAppProvider>
  )
}

export default MyApp
