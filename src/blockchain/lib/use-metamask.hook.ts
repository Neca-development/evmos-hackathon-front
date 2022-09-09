import { useContext } from 'react'

import { MetamaskContext } from './metamask.provider'

export const useMetamask = () => {
  const { ...contextValues } = useContext(MetamaskContext)
  return { ...contextValues }
}
