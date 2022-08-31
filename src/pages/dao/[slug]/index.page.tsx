import { DaoApi } from '@entities/dao'
import { MintRequestApi } from '@entities/mint-request'
import { CreateVoting } from '@features/create-voting'
import { Paper } from '@mui/material'
import {
  Header,
  HeadingOne,
  HeadingTwo,
  MainContainer,
  MButton,
  Paragraph,
} from '@shared/ui'
import { WebIcon } from '@shared/ui/icons/web.icon'
import { useRouter } from 'next/router'
import * as React from 'react'

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
        <Paper className="mb-10 p-9 space-x-14 flex text-white bg-dao-hero">
          {/* DAO image */}
          <div>
            <div className="h-[7rem] w-[7rem] bg-white">
              <img src={daoInfo?.ava} alt="" />
            </div>
          </div>
          {/* /DAO image */}

          {/* DAO info */}
          <div className="w-full">
            <div className="flex justify-between">
              <HeadingOne className="mb-1">{daoInfo?.name}</HeadingOne>
              <MButton>
                <label className="cursor-pointer">
                  Invite users
                  <input hidden type={'file'} onChange={inviteUsers} />
                </label>
              </MButton>
            </div>

            <Paragraph className="mb-10 space-x-1 flex items-center">
              <WebIcon />
              <span className="text-orange">SC address</span>
            </Paragraph>

            <Paragraph>{daoInfo?.descr}</Paragraph>
          </div>
          {/* /DAO info */}
        </Paper>

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
          <HeadingTwo>Current votes</HeadingTwo>
          {!isVotingFromOpen && (
            <MButton onClick={handleVotingFormOpen}>Create vote</MButton>
          )}
        </div>

        <VotingList daoAddress={dao?.contractAddress} votings={dao?.votings} />
      </MainContainer>
    </>
  )
}
