import { UserApi } from '@entities/user'
import { Header, HeadingTwo, MainContainer, MButton } from '@shared/ui'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import * as React from 'react'

import { DaoList } from './ui/dao-list.component'
import { ProfileHero } from './ui/profile-hero.component'

export default function UserPage() {
  const { account } = useEthers()
  const { data } = UserApi.useGetUserQuery({ userAddress: account })

  const router = useRouter()

  React.useEffect(() => {
    router.prefetch('/create-dao')
  }, [])

  const handleCreateButtonClick = () => router.push('/create-dao')

  return (
    <>
      <Header />

      <ProfileHero />

      <MainContainer>
        <div className="mb-5 flex justify-between items-center">
          <HeadingTwo>Your DAO&apos;s list</HeadingTwo>
          <MButton onClick={handleCreateButtonClick}>Create DAO</MButton>
        </div>

        {data ? <DaoList daos={data.daos} /> : <div>You have no DAO (sad)</div>}
      </MainContainer>
    </>
  )
}
