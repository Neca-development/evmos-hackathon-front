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
  const { data: daoInfo } = DaoApiService.useGetInfoFromIpfsQuery(
    {
      ipfsUrl: `${dao?.ipfsUrl}/dao.json`,
    },
    { skip: !dao }
  )
  const { data: tokenInfo } = DaoApiService.useGetTokenFromIpfsQuery(
    {
      ipfsUrl: `${dao?.ipfsUrl}/${mintRequest.tokenType}.json`,
    },
    { skip: !dao }
  )

  return (
    <>
      {!daoInfo || !dao || !tokenInfo ? (
        <DaoCardSkeleton />
      ) : (
        <MPaper className="w-full space-y-3">
          {/* DAO info */}
          <div className="grid grid-cols-4 gap-x-5">
            <img src={daoInfo.ava} alt="" className="w-full" />

            <div className="col-span-3 py-2 flex flex-col">
              <HeadingThree className="mb-3 text-orange break-words">
                {daoInfo.name}
              </HeadingThree>
              <Paragraph className="break-words">{daoInfo.descr}</Paragraph>
            </div>
          </div>
          {/* /DAO info */}

          <MDivider />

          {/* Token info */}
          <HeadingFour>
            NFT with a {tokenInfo.type} vote weight is available for mint
          </HeadingFour>
          <div className="flex justify-between items-end">
            <div className="h-14 w-14 flex justify-center items-center text-xs">
              <img src={tokenInfo.img} alt={`${tokenInfo.type} vote token`} />
            </div>

            <MButton onClick={onMint}>Mint</MButton>
          </div>
          {/* /Token info */}
        </MPaper>
      )}
    </>
  )
}
