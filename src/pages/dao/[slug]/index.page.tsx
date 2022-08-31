import { DaoApi } from '@entities/dao'
import { MintRequestApi } from '@entities/mint-request'
import { CreateVotingForm } from '@features/create-voting/ui/create-voting-form.component'
import { List, ListItem, Paper } from '@mui/material'
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

import { VoteCard } from '../ui/vote-card.component'

const votesList = [
  {
    id: 0,
    question: 'Voting question',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'active',
  },
  {
    id: 1,
    question: 'Voting question',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'active',
  },
  {
    id: 2,
    question: 'Voting question',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'inactive',
  },
]

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

        <CreateVotingForm daoAddress={slug} onCancel={() => null} />

        <div className="mb-5 flex justify-between items-center">
          <HeadingTwo>Current votes</HeadingTwo>
          <MButton>Create vote</MButton>
        </div>

        <List className="space-y-5">
          {votesList.map((vote) => (
            <ListItem key={vote.id} className="p-0">
              <VoteCard vote={vote} />
            </ListItem>
          ))}
        </List>
      </MainContainer>
    </>
  )
}
