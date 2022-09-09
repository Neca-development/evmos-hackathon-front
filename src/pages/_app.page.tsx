import '@shared/styles/global.scss'

import { MetamaskProvider } from '@blockchain/lib'
import { ModalProvider } from '@shared/lib'
import { store } from '@shared/store'
import { ProcessingModal } from '@shared/ui'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MetamaskProvider>
      <Provider store={store}>
        <ModalProvider>
          <Component {...pageProps} />
          <ProcessingModal />
        </ModalProvider>
      </Provider>
    </MetamaskProvider>
  )
}

export default MyApp
