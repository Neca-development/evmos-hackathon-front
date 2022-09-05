import type { IDaoEntity } from '@entities/dao'
import { DaoApi } from '@entities/dao'
import { useEffect } from 'react'

export const useDaoInfo = (dao: IDaoEntity | undefined) => {
  const { data: daoInfo, refetch: refetchDaoInfo } = DaoApi.useGetInfoFromIpfsQuery({
    ipfsUrl: dao?.ipfsUrl,
  })

  useEffect(() => {
    if (dao) {
      refetchDaoInfo()
    }
  }, [dao])

  return { daoInfo, refetchDaoInfo }
}
