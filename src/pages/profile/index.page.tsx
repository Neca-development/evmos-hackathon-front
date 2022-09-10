import { useMetamask } from '@blockchain/lib'
import { MintRequestApiService } from '@entities/mint-request'
import { UserApiService } from '@entities/user'
import { DaoCardSkeleton, Header, HeadingTwo, MainContainer, MButton } from '@shared/ui'
import { useRouter } from 'next/router'
import * as React from 'react'

import { DaoList } from './ui/dao-list.component'
import { MintRequestList } from './ui/mint-request-list.component'
import { ProfileHero } from './ui/profile-hero.component'

export default function UserPage() {
  const { account, isLoading: isMetamaskLoading } = useMetamask()
  const {
    data: user,
    refetch: refetchUser,
    isLoading: isUserLoading,
  } = UserApiService.useGetUserQuery(
    {
      userAddress: account,
    },
    { skip: !account }
  )
  const {
    data: mintRequests,
    refetch: refetchMintRequests,
    isLoading: isMintRequestsLoading,
  } = MintRequestApiService.useGetMintRequestsForUserQuery(
    {
      userAddress: account,
    },
    { skip: !account }
  )

  const isDataLoading = isMetamaskLoading || isUserLoading || isMintRequestsLoading

  const router = useRouter()

  React.useEffect(() => {
    router.prefetch('/create-dao')
  }, [])

  const handleClickOnCreateButton = () => router.push('/create-dao')

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
          <MButton onClick={handleClickOnCreateButton}>Create DAO</MButton>
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
