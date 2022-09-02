import { DaoApi } from '@entities/dao'
import { MintRequestApi } from '@entities/mint-request'
import { CreateVoting } from '@features/create-voting'
import { Header, HeadingTwo, MainContainer, MButton } from '@shared/ui'
import { useRouter } from 'next/router'
import * as React from 'react'

import { DaoHero } from '../ui/dao-hero.component'
import { VotingList } from '../ui/voting-list.component'

export default function DaoPage() {
  const router = useRouter()
  const { slug } = router.query
  const { data: dao, refetch: refetchDao } = DaoApi.useGetDaoQuery({ daoAddress: slug })
  const { data: daoInfo, refetch: refetchDaoInfo } = DaoApi.useGetInfoFromIpfsQuery({
    ipfsUrl: dao?.ipfsUrl,
  })

  React.useEffect(() => {
    router.prefetch('/profile')
  }, [])

  React.useEffect(() => {
    if (slug && typeof slug !== 'string') {
      router.push('/profile')
    } else if (slug) {
      refetchDao()
    }
  }, [slug])

  React.useEffect(() => {
    if (dao) {
      refetchDaoInfo()
    }
  }, [dao])

  const [postMintRequestList] = MintRequestApi.usePostMintRequestListMutation()

  const inviteUsers = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) {
      return
    }

    const csvFile = files[0]
    if (!csvFile) {
      return
    }

    const csvFileFormData = new FormData()
    csvFileFormData.append('file', csvFile)

    if (!slug || typeof slug !== 'string') {
      return
    }

    await postMintRequestList({ daoAddress: slug, csv: csvFileFormData })
  }

  const [isVotingFromOpen, setIsVotingFormOpen] = React.useState(false)

  const handleVotingFormOpen = () => {
    setIsVotingFormOpen(true)
  }

  const handleVotingFormClose = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsVotingFormOpen(false)
  }

  return (
    <>
      <Header />

      <MainContainer>
        <DaoHero
          image={daoInfo?.ava}
          name={daoInfo?.name}
          description={daoInfo?.descr}
          onInvite={inviteUsers}
        />

        {isVotingFromOpen && (
          <div className="mb-10">
            <HeadingTwo className="mb-5">Voting creation</HeadingTwo>
            <CreateVoting.CreateVotingForm
              daoAddress={slug}
              onCreate={refetchDao}
              onCancel={handleVotingFormClose}
            />
          </div>
        )}

        <div className="mb-5 flex justify-between items-center">
          <HeadingTwo>Current votings</HeadingTwo>
          {!isVotingFromOpen && (
            <MButton onClick={handleVotingFormOpen}>Create vote</MButton>
          )}
        </div>

        <VotingList daoAddress={dao?.contractAddress} votings={dao?.__votings__} />
      </MainContainer>
    </>
  )
}
