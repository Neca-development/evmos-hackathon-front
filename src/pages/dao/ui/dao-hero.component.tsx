import { InviteUsersUiService } from '@features/invite-users'
import { Paper, Skeleton } from '@mui/material'
import { HeadingOne, MButton, Paragraph, WebIcon } from '@shared/ui'
import { useState } from 'react'

interface IDaoHeroProperties {
  daoAddress: string
  daoInfo?: {
    ava: string
    name: string
    descr: string
  }
}

export function DaoHero(props: IDaoHeroProperties) {
  const { daoAddress, daoInfo } = props

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const handleClickOnInviteButton = () => {
    setIsInviteModalOpen(true)
  }

  const handleModalClose = () => {
    setIsInviteModalOpen(false)
  }

  return (
    <>
      {!daoInfo ? (
        <Skeleton variant="rounded" className="h-[13rem] mb-10 bg-light-gray" />
      ) : (
        <Paper className="min-h-[13rem] mb-10 p-8 space-x-12 flex text-white bg-dao-hero">
          {/* DAO image */}
          <div>
            <div className="h-[7rem] w-[7rem] flex justify-center items-center">
              <img src={daoInfo.ava} alt="" className="w-full" />
            </div>
          </div>
          {/* /DAO image */}

          {/* DAO info */}
          <div className="w-full">
            <div className="grid grid-cols-3 gap-x-5">
              <HeadingOne className="col-span-2 mb-1">{daoInfo.name}</HeadingOne>

              <div>
                <MButton onClick={handleClickOnInviteButton}>Invite users</MButton>
              </div>
            </div>

            <div className="mb-10 space-x-1 flex items-center cursor-pointer">
              <WebIcon />
              <div className="font-bold text-orange">
                <Paragraph>Smart contract</Paragraph>
                <div className="h-[1px] w-full bg-orange" />
              </div>
            </div>

            <Paragraph>{daoInfo.descr}</Paragraph>
          </div>
          {/* /DAO info */}
        </Paper>
      )}

      <InviteUsersUiService.InviteModal
        daoAddress={daoAddress}
        isOpen={isInviteModalOpen}
        onClose={handleModalClose}
      />
    </>
  )
}
