import type { DaoModelService } from '@entities/dao'
import { DaoApiService } from '@entities/dao'

export const useDaoInfo = (dao: DaoModelService.IDaoEntity | undefined) => {
  const { data: daoInfo, refetch: refetchDaoInfo } =
    DaoApiService.useGetInfoFromIpfsQuery(
      {
        ipfsUrl: `${dao?.ipfsUrl}/dao.json`,
      },
      { skip: !dao }
    )

  return { daoInfo, refetchDaoInfo }
}
