import type { IDaoEntity } from '@entities/dao'
import { DaoApi } from '@entities/dao'
import {
  // HeadingFour,
  HeadingThree,
  MButton,
  MDivider,
  MPaper,
  Paragraph,
} from '@shared/ui'
import * as React from 'react'

interface IDaoCardProperties {
  dao: IDaoEntity
}

export function DaoCard({ dao }: IDaoCardProperties) {
  const [info, setInfo] = React.useState<any>(null)

  const { data } = DaoApi.useGetInfoFromIpfsQuery({ ipfsUrl: dao.ipfsUrl })

  React.useEffect(() => {
    if (data) {
      setInfo(data)
    }
  }, [data])

  return (
    <MPaper className="space-y-3">
      {/* DAO info */}
      <div className="space-x-5 flex">
        <div>
          <div className="h-[6rem] w-[6rem] bg-gray-400" />
        </div>
        <div className="flex flex-col justify-end">
          <HeadingThree className="mb-4 text-orange">{info.name}</HeadingThree>
          <Paragraph>{info.descr}</Paragraph>
        </div>
      </div>
      {/* /DAO info */}

      <MDivider />

      {/* Token info */}
      {/* <HeadingFour>
        {dao.status === 'mint'
          ? 'NFT with a 1 vote weight is available for mint'
          : 'You have an NFT with a 1 vote weight in this DAO'}
      </HeadingFour> */}
      <div className="flex justify-between items-end">
        <div className="h-14 w-14 bg-gray-400" />
        {/* <MButton>{dao.status === 'mint' ? 'Mint' : 'Enter'}</MButton> */}
        <MButton>{'Mint'}</MButton>
      </div>
      {/* /Token info */}
    </MPaper>
  )
}
