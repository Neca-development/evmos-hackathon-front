import { DaoApi } from '@entities/dao'
import type { IMintRequestEntity } from '@entities/mint-request/mint-request.entity'
import {
  HeadingFour,
  HeadingThree,
  MButton,
  MDivider,
  MPaper,
  Paragraph,
} from '@shared/ui'
import * as React from 'react'

interface IMintRequestCardProperties {
  mintRequest: IMintRequestEntity
}

export function MintRequestCard({ mintRequest }: IMintRequestCardProperties) {
  const { data: dao } = DaoApi.useGetDaoQuery({ daoAddress: mintRequest.daoAddress })
  const { data: daoInfo } = DaoApi.useGetInfoFromIpfsQuery({ ipfsUrl: dao?.ipfsUrl })

  return (
    <MPaper className="w-full space-y-3">
      {/* DAO info */}
      <div className="space-x-5 flex">
        <div className="h-[6rem] w-[6rem] flex justify-center items-center bg-gray-400">
          <img src={daoInfo?.ava} alt="" className="w-full" />
        </div>
        <div className="flex flex-col justify-end">
          <HeadingThree className="mb-4 text-orange">{daoInfo?.name}</HeadingThree>
          <Paragraph>{daoInfo?.descr}</Paragraph>
        </div>
      </div>
      {/* /DAO info */}

      <MDivider />

      {/* Token info */}
      <HeadingFour>NFT with a 1 vote weight is available for mint</HeadingFour>
      <div className="flex justify-between items-end">
        <div className="h-14 w-14 flex justify-center items-center bg-gray-400" />

        <MButton>Mint</MButton>
      </div>
      {/* /Token info */}
    </MPaper>
  )
}
