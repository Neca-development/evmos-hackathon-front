import { ETH_REQUEST_PARAMS } from '../constants'

declare global {
  interface Window {
    ethereum?: any
  }
}

export async function switchToEvmosNetwork() {
  try {
    if (!window) {
      return
    }

    const { ethereum } = window

    if (!ethereum) {
      return
    }

    if (!ethereum.request) {
      return
    }

    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{ ...ETH_REQUEST_PARAMS }],
    })

    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ETH_REQUEST_PARAMS.chainId }],
    })
  } catch (error: any) {
    throw new Error(error)
  }
}
