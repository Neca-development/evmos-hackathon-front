import { useEthers } from '@usedapp/core'

// import { DAO_FACTORY_ADDRESS } from '../constants'
// import { DaoFactoryAbi__factory } from '../typechain/factories/DaoFactoryAbi__factory'

export const useCreateDao = () => {
  const { library } = useEthers()

  const createDao = () => {
    console.log('commented function')
    console.log('library:', library)
    // if (!library) throw new Error('Wallet is not connected')

    // const daoFactoryContract = DaoFactoryAbi__factory.connect(
    //   DAO_FACTORY_ADDRESS,
    //   library
    // )

    // try {
    //   const createDaoTransaction = daoFactoryContract
    // } catch (error) {
    //   throw new Error(error)
    // }
  }

  return { createDao }
}
