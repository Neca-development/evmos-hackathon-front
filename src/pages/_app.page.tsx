import '@shared/styles/global.scss'

import { store } from '@shared/store'
import type { Config } from '@usedapp/core'
import { DAppProvider, Rinkeby } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

const config: Config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
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
