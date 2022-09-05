import { DaoApi } from '@entities/dao'
import { MintRequestApi } from '@entities/mint-request'
import { CreateVotingUiService } from '@features/create-voting'
import { Header, HeadingTwo, MainContainer, MButton } from '@shared/ui'
import { useRouter } from 'next/router'
import * as React from 'react'

import { DaoHero } from '../ui/dao-hero.component'
import { VotingList } from '../ui/voting-list.component'

export default function DaoPage() {
  const router = useRouter()
  const { slug: daoAddress } = router.query
  const { data: dao, refetch: refetchDao } = DaoApi.useGetDaoQuery({ daoAddress })
  const { data: daoInfo, refetch: refetchDaoInfo } = DaoApi.useGetInfoFromIpfsQuery({
    ipfsUrl: dao?.ipfsUrl,
  })

  React.useEffect(() => {
    router.prefetch('/profile')
  }, [])

  const isDaoAddressValid =
    daoAddress && typeof daoAddress === 'string' && daoAddress !== 'undefined'

  React.useEffect(() => {
    if (isDaoAddressValid) {
      refetchDao()
    } else if (daoAddress) {
      router.push('/profile')
    }
  }, [daoAddress])

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

    if (!isDaoAddressValid) {
      return
    }

    await postMintRequestList({ daoAddress, csv: csvFileFormData })
  }

  const [isVotingFormOpen, setIsVotingFormOpen] = React.useState(false)

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

        {isVotingFormOpen && isDaoAddressValid && (
          <div className="mb-10">
            <HeadingTwo className="mb-5">Voting creation</HeadingTwo>
            <CreateVotingUiService.CreateVotingForm
              daoAddress={daoAddress}
              onCreate={refetchDao}
              onCancel={handleVotingFormClose}
            />
          </div>
        )}

        <div className="mb-5 flex justify-between items-center">
          <HeadingTwo>Current votings</HeadingTwo>
          {!isVotingFormOpen && (
            <MButton disabled={!isDaoAddressValid} onClick={handleVotingFormOpen}>
              Create voting
            </MButton>
          )}
        </div>

        <VotingList daoAddress={dao?.contractAddress} votings={dao?.__votings__} />
      </MainContainer>
    </>
  )
}
