import { MintRequestApi } from '@entities/mint-request'
import { UserApi } from '@entities/user'
import { Header, HeadingTwo, MainContainer, MButton } from '@shared/ui'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import * as React from 'react'

import { DaoCardSkeleton } from './ui/dao-card-skeleton.component'
import { DaoList } from './ui/dao-list.component'
import { MintRequestList } from './ui/mint-request-list.component'
import { ProfileHero } from './ui/profile-hero.component'

export default function UserPage() {
  const { account, isLoading: isAccountLoading } = useEthers()
  const {
    data: user,
    refetch: refetchUser,
    isLoading: isUserLoading,
  } = UserApi.useGetUserQuery({
    userAddress: account,
  })
  const {
    data: mintRequests,
    refetch: refetchMintRequests,
    isLoading: isMintRequestsLoading,
  } = MintRequestApi.useGetMintRequestsForUserQuery({
    userAddress: account,
  })

  const isDataLoading = isAccountLoading || isUserLoading || isMintRequestsLoading

  const router = useRouter()

  React.useEffect(() => {
    router.prefetch('/create-dao')
  }, [])

  const handleCreateButtonClick = () => router.push('/create-dao')

  const handleMint = () => {
    refetchUser()
    refetchMintRequests()
  }

  return (
    <>
      <Header />

      <ProfileHero />

      <MainContainer>
        <div className="mb-5 flex justify-between items-center">
          <HeadingTwo>Your DAO&apos;s list</HeadingTwo>
          <MButton onClick={handleCreateButtonClick}>Create DAO</MButton>
        </div>

        {isDataLoading ? (
          <DaoCardSkeleton />
        ) : (
          <>
            {user && <DaoList daos={user.daos} />}
            {mintRequests && (
              <MintRequestList mintRequests={mintRequests} onMint={handleMint} />
            )}
          </>
        )}
      </MainContainer>
    </>
  )
}
