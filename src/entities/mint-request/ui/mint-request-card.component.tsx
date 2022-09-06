import { DaoApiService } from '@entities/dao'
import {
  DaoCardSkeleton,
  HeadingFour,
  HeadingThree,
  MButton,
  MDivider,
  MPaper,
  Paragraph,
} from '@shared/ui'
import * as React from 'react'

import type { IMintRequestEntity } from '../model'

export interface IMintRequestCardProperties {
  mintRequest: IMintRequestEntity
  onMint: () => void
}

export function MintRequestCard(props: IMintRequestCardProperties) {
  const { mintRequest, onMint } = props

  const { data: dao } = DaoApiService.useGetDaoQuery({
    daoAddress: mintRequest.daoAddress,
  })
  const { data: daoInfo } = DaoApiService.useGetInfoFromIpfsQuery({
    ipfsUrl: dao?.ipfsUrl,
  })

  return (
    <>
      {!daoInfo ? (
        <DaoCardSkeleton />
      ) : (
        <MPaper className="w-full space-y-3">
          {/* DAO info */}
          <div className="space-x-4 flex">
            <div className="h-[6rem] w-[6rem] flex justify-center items-center bg-[#D9D9D9]">
              <img src={daoInfo.ava} alt="" className="w-full" />
            </div>
            <div className="py-2 flex flex-col">
              <HeadingThree className="mb-3 text-orange">{daoInfo.name}</HeadingThree>
              <Paragraph>{daoInfo.descr}</Paragraph>
            </div>
          </div>
          {/* /DAO info */}

          <MDivider />

          {/* Token info */}
          <HeadingFour>NFT with a 1 vote weight is available for mint</HeadingFour>
          <div className="flex justify-between items-end">
            <div className="h-14 w-14 flex justify-center items-center bg-[#D9D9D9]" />

            <MButton onClick={onMint}>Mint</MButton>
          </div>
          {/* /Token info */}
        </MPaper>
      )}
    </>
  )
}
