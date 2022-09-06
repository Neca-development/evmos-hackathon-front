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

  const { data: dao, refetch: refetchDao } = DaoApiService.useGetDaoQuery({
    daoAddress: slug,
  })

  useEffect(() => {
    if (isDaoAddressValid) {
      setDaoAddress(slug)
      refetchDao()
    } else if (daoAddress) {
      router.push('/profile')
    }
  }, [isDaoAddressValid])

  return { daoAddress, dao, refetchDao }
}
