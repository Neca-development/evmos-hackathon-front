import { useMetamask } from '@blockchain/lib'
import { DaoApiService } from '@entities/dao'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useDao = () => {
  const [daoAddress, setDaoAddress] = useState('')

  const router = useRouter()

  useEffect(() => {
    router.prefetch('/profile')
  }, [])

  const { slug } = router.query
  const isDaoAddressValid = slug && typeof slug === 'string' && slug !== 'undefined'

  const { data: dao, refetch: refetchDao } = DaoApiService.useGetDaoQuery(
    {
      daoAddress: slug,
    },
    { skip: !isDaoAddressValid }
  )

  useEffect(() => {
    if (isDaoAddressValid) {
      setDaoAddress(slug)
    } else if (daoAddress) {
      router.push('/profile')
    }
  }, [isDaoAddressValid])

  const { account } = useMetamask()

  useEffect(() => {
    if (dao) {
      const isUserInDao = dao.users.some((user) => user.walletAddress === account)
      if (!isUserInDao) {
        router.push('/profile')
      }
    }
  }, [dao, account])

  return { daoAddress, dao, refetchDao }
}
