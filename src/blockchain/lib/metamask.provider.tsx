import type { JsonRpcSigner } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { createContext, useEffect, useState } from 'react'

import { EVMOS_TESTNET_CHAINID } from '../constants'

interface IMetamask {
  provider?: ethers.providers.Web3Provider
  signer?: JsonRpcSigner
  chainId?: number
  account?: string
}

interface IMetamaskContext extends IMetamask {
  isLoading: boolean
  connectWallet?: () => Promise<void>
  disconnectWallet?: () => void
}

const INITIAL_VALUE: IMetamaskContext = {
  provider: undefined,
  signer: undefined,
  chainId: undefined,
  account: undefined,
  isLoading: true,
  connectWallet: undefined,
  disconnectWallet: undefined,
}

export const MetamaskContext = createContext<IMetamaskContext>(INITIAL_VALUE)

interface IMetamaskProviderProperties {
  children?: ReactNode
}

export const MetamaskProvider = ({ children }: IMetamaskProviderProperties) => {
  const [metamask, setMetamask] = useState<IMetamask>({ ...INITIAL_VALUE })
  const { provider, signer, chainId, account } = metamask

  const [isLoading, setIsLoading] = useState(INITIAL_VALUE.isLoading)

  /** Connect browser wallet to dapp */
  const connectWallet = async () => {
    if (!window) {
      throw new Error('Window is undefined')
    }
    if (!window.ethereum) {
      throw new Error('Metamask extension is not installed')
    }
    if (!window.ethereum.isConnected()) {
      throw new Error('Metamask extension is not installed')
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const web3Signer = web3Provider.getSigner()
    const web3WalletAddress = await web3Signer.getAddress()
    const web3ChainId = await web3Signer.getChainId()

    setMetamask({
      provider: web3Provider,
      signer: web3Signer,
      chainId: web3ChainId,
      account: web3WalletAddress,
    })
  }

  /* Authorization guard */
  const router = useRouter()
  const { asPath } = router
  const isHomepage = asPath === '/'

  /* Authorize user */
  useEffect(() => {
    async function authorizeUser() {
      if (window.ethereum) {
        const connectedAccounts: string[] = await window.ethereum.request({
          method: 'eth_accounts',
        })
        if (!isHomepage && connectedAccounts.length > 0) {
          await connectWallet()
        }
        setIsLoading(false)
      }
    }
    authorizeUser()
  }, [isHomepage])

  /** Disconnect browser wallet from dapp */
  const disconnectWallet = () => {
    setMetamask({ ...INITIAL_VALUE })
  }

  /* Subscribe on network change event */
  useEffect(() => {
    if (provider) {
      provider.on('network', async () => {
        const newSigner = provider.getSigner()
        const newChainId = await newSigner.getChainId()

        if (newChainId !== EVMOS_TESTNET_CHAINID) {
          disconnectWallet()
        }
      })
    }
  }, [provider])

  /* Subscribe on account change event */
  useEffect(() => {
    if (provider) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length === 0) {
          setMetamask(INITIAL_VALUE)
          return
        }

        const newSigner = provider.getSigner()
        const newAccount = await newSigner.getAddress()

        setMetamask((previous) => ({
          ...previous,
          signer: newSigner,
          account: newAccount,
        }))
      })
    }
  }, [provider])

  /* Subscribe on disconnect wallet event */
  useEffect(() => {
    window.ethereum.on('disconnect', disconnectWallet)
  }, [provider])

  useEffect(() => {
    const metamaskValues = Object.values(metamask)
    const isMetamaskValid = metamaskValues.every(Boolean)

    if (!isLoading && !isMetamaskValid && !isHomepage) {
      router.push('/')
    }
  }, [isHomepage, isLoading, router, metamask])

  /** Defined values for context provider */
  const providerValues = {
    provider,
    signer,
    chainId,
    account,
    isLoading,
    connectWallet,
    disconnectWallet,
  }

  return (
    <MetamaskContext.Provider value={providerValues}>{children}</MetamaskContext.Provider>
  )
}
