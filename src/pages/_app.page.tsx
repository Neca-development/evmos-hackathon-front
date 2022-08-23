import '../styles/global.css'

import { store } from '@store/store'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
