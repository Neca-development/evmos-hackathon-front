import { Contract, ethers } from 'ethers'

import abi from './abi/dao-factory.abi.json'
import { DAO_FACTORY_ADDRESS } from './constants'

const nftContractInterface = new ethers.utils.Interface(abi as unknown as string)
export const contractAddress = DAO_FACTORY_ADDRESS as string

const daoFactoryContract = new Contract(contractAddress, nftContractInterface)

export {daoFactoryContract}
