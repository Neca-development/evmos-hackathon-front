import type { DaoModelService } from '@entities/dao'
import { DaoApiService } from '@entities/dao'
import { useEffect } from 'react'

export const useDaoInfo = (dao: DaoModelService.IDaoEntity | undefined) => {
  const { data: daoInfo, refetch: refetchDaoInfo } =
    DaoApiService.useGetInfoFromIpfsQuery({
      ipfsUrl: dao?.ipfsUrl,
    })

  useEffect(() => {
    if (dao) {
      refetchDaoInfo()
    }
  }, [dao])

  return { daoInfo, refetchDaoInfo }
}
