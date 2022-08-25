import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import * as React from 'react'

import { DAO_FACTORY_ADDRESS } from '../constants'
import type { DaoAbi } from '../typechain'
import { DaoAbi__factory } from '../typechain/factories/DaoAbi__factory'

export const useDaoContract = () => {
  const [daoContract, setDaoContract] = React.useState<DaoAbi | null>(null)

  const { library } = useEthers()
  const router = useRouter()

  React.useEffect(() => {
    router.prefetch('/')
  }, [])

  React.useEffect(() => {
    if (library) {
      const contract = DaoAbi__factory.connect(DAO_FACTORY_ADDRESS, library)
      setDaoContract(contract)
    } else {
      setDaoContract(null)
      router.push('/')
    }
  }, [library])

  return { daoContract }
}
