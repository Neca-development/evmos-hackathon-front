import { ethers } from 'ethers'

export const EVMOS_TESTNET_CHAINID = 9000
export const EVMOS_TESTNET_RPC_URL = 'https://eth.bd.evmos.dev:8545'

export const ETH_REQUEST_PARAMS = {
  chainId: ethers.utils.hexValue(EVMOS_TESTNET_CHAINID),
  rpcUrls: [EVMOS_TESTNET_RPC_URL],
  chainName: 'Evmos Testnet',
  nativeCurrency: {
    name: 'tEVMOS',
    symbol: 'tEVMOS',
    decimals: 18,
  },
  blockExplorerUrls: ['https://evm.evmos.dev'],
}

export const DAO_FACTORY_ADDRESS = '0x195672A79f1971571755abAdbc127Ea31FaA852B'
