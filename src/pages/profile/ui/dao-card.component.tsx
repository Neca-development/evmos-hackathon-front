import type { IDaoEntity } from '@entities/dao'
import { DaoApi } from '@entities/dao'
import {
  HeadingFour,
  HeadingThree,
  MButton,
  MDivider,
  MPaper,
  Paragraph,
} from '@shared/ui'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useUserToken } from 'src/blockchain'

interface IDaoCardProperties {
  dao: IDaoEntity
}

export function DaoCard({ dao }: IDaoCardProperties) {
  const { data } = DaoApi.useGetInfoFromIpfsQuery({ ipfsUrl: dao.ipfsUrl })
  const { tokenIpfsUrl } = useUserToken(dao.contractAddress)

  const router = useRouter()

  return (
    <MPaper className="w-full space-y-3">
      {/* DAO info */}
      <div className="space-x-4 flex">
        <div className="h-[6rem] w-[6rem] flex justify-center items-center bg-[#D9D9D9]">
          <img src={data?.ava} alt="" className="w-full" />
        </div>
        <div className="py-2 flex flex-col">
          <HeadingThree className="mb-3 text-orange">{data?.name}</HeadingThree>
          <Paragraph>{data?.descr}</Paragraph>
        </div>
      </div>
      {/* /DAO info */}

      <MDivider />

      {/* Token info */}
      <HeadingFour>You have an NFT with a 1 vote weight in this DAO</HeadingFour>
      <div className="flex justify-between items-end">
        <div className="h-14 w-14 flex justify-center items-center bg-[#D9D9D9]">
          <img src={tokenIpfsUrl} alt="" className="w-full" />
        </div>

        <MButton onClick={() => router.push(`/dao/${dao.contractAddress}`)}>
          Enter
        </MButton>
      </div>
      {/* /Token info */}
    </MPaper>
  )
}
