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
        <Paper className="min-h-[13rem] mb-10 text-white bg-transparent">
          <div className="p-8 pb-0 space-x-10 grid grid-cols-4 bg-grayish-blue">
            <div className="self-end h-[7rem] w-[7rem] flex justify-center items-end">
              <img src={daoInfo.ava} alt="" className="w-full translate-y-[50%]" />
            </div>

            <div className="col-span-3">
              <div className="grid grid-cols-3 gap-x-5">
                <HeadingOne className="col-span-2 mb-1">{daoInfo.name}</HeadingOne>
                <div>
                  <MButton onClick={handleClickOnInviteButton}>Invite users</MButton>
                </div>
              </div>

              <a
                href={`https://evm.evmos.dev/address/${daoAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-orange"
              >
                <div className="space-x-1 flex items-center cursor-pointer">
                  <WebIcon />
                  <Paragraph className="underline underline-offset-8 decoration-2">
                    Smart contract
                  </Paragraph>
                </div>
              </a>
            </div>
          </div>

          <div className="p-8 grid grid-cols-4 bg-dark-grayish-blue">
            <div className="col-start-2 col-span-3">
              <Paragraph className="ml-10">{daoInfo.descr}</Paragraph>
            </div>
          </div>
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
