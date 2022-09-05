import { CreateVotingUiService } from '@features/create-voting'
import { useInviteUsers } from '@features/invite-users'
import {
  Header,
  HeadingTwo,
  MainContainer,
  MButton,
  VotingCardSkeleton,
} from '@shared/ui'
import * as React from 'react'

import { useDao, useDaoInfo } from '../lib'
import { DaoHero } from '../ui/dao-hero.component'
import { VotingList } from '../ui/voting-list.component'

export default function DaoPage() {
  const { daoAddress, dao, refetchDao } = useDao()
  const isLoading = !daoAddress || !dao || dao.__votings__ == undefined

  const { daoInfo } = useDaoInfo(dao)

  const { inviteUsers } = useInviteUsers(daoAddress)

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

        {isVotingFormOpen && (
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
            <MButton disabled={isLoading} onClick={handleVotingFormOpen}>
              Create voting
            </MButton>
          )}
        </div>

        {isLoading ? (
          <VotingCardSkeleton />
        ) : (
          <VotingList daoAddress={daoAddress} votings={dao.__votings__} />
        )}
      </MainContainer>
    </>
  )
}
