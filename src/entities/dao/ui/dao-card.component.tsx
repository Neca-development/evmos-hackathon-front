import { useUserToken } from '@blockchain/api'
import {
  DaoCardSkeleton,
  HeadingFour,
  HeadingThree,
  MButton,
  MDivider,
  MPaper,
  Paragraph,
} from '@shared/ui'
import { useRouter } from 'next/router'
import * as React from 'react'

import { useGetInfoFromIpfsQuery, useGetTokenFromIpfsQuery } from '../api'
import type { IDaoEntity } from '../model'

interface IDaoCardProperties {
  dao: IDaoEntity
}

export function DaoCard({ dao }: IDaoCardProperties) {
  const { data: daoInfo } = useGetInfoFromIpfsQuery({
    ipfsUrl: `${dao.ipfsUrl}/dao.json`,
  })
  const { tokenIpfsUrl } = useUserToken(dao.contractAddress)
  const { data: tokenInfo } = useGetTokenFromIpfsQuery(
    {
      ipfsUrl: `${dao.ipfsUrl}${tokenIpfsUrl}`,
    },
    { skip: !tokenIpfsUrl }
  )

  const isLoading = !daoInfo || !tokenInfo || !tokenIpfsUrl

  const router = useRouter()

  const handleClickOnEnterButton = () => {
    router.push(`/dao/${dao.contractAddress}`)
  }

  return (
    <>
      {isLoading ? (
        <DaoCardSkeleton />
      ) : (
        <MPaper className="w-full space-y-3">
          {/* DAO info */}
          <div className="grid grid-cols-5 gap-x-5">
            <div className="h-[6rem] w-[6rem] flex justify-center items-center bg-[#D9D9D9]">
              <img src={daoInfo.ava} alt="" className="w-full" />
            </div>
            <div className="col-span-4 py-2 flex flex-col">
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
            You have an NFT with a {tokenInfo.type} vote weight in this DAO
          </HeadingFour>
          <div className="flex justify-between items-end">
            <div className="h-14 w-14 flex justify-center items-center text-xs">
              <img src={tokenInfo.img} alt={`${tokenInfo.type} vote token`} />
            </div>

            <MButton onClick={handleClickOnEnterButton}>Enter</MButton>
          </div>
          {/* /Token info */}
        </MPaper>
      )}
    </>
  )
}
