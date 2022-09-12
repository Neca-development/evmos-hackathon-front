import { MintRequestApiService } from '@entities/mint-request'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useModal } from '@shared/lib'
import { CloseIcon, HeadingFour, MButton, MPaper, Paragraph } from '@shared/ui'
import { createRef } from 'react'

interface IInviteModalProperties {
  daoAddress: string
  isOpen: boolean
  onClose: () => void
}

export function InviteModal(props: IInviteModalProperties) {
  const { daoAddress, isOpen, onClose } = props

  const fileInputReference = createRef<HTMLInputElement>()

  const { setIsModalOpen, setModalState, setModalText } = useModal()

  const [postMintRequestList] = MintRequestApiService.usePostMintRequestListMutation()

  const inviteUsers = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return

    const csvFile = files[0]
    if (!csvFile) return

    const csvFileFormData = new FormData()
    csvFileFormData.append('file', csvFile)

    onClose()
    setIsModalOpen(true)
    setModalState('pending')
    setModalText('Sending invites...')

    await postMintRequestList({ daoAddress, csv: csvFileFormData })

    setModalState('success')
    setModalText('You successfully invites users in this DAO')
  }

  return (
    <Dialog
      maxWidth={false}
      PaperComponent={MPaper}
      PaperProps={{
        className: 'w-[17rem] p-3 bg-grayish-blue',
      }}
      open={isOpen}
    >
      <DialogTitle className="mb-3 p-0 flex justify-between">
        <HeadingFour>Invite users</HeadingFour>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="mb-3 p-0">
        <Paragraph>Import users list from CSV</Paragraph>
      </DialogContent>

      <DialogActions className="p-0 justify-start">
        <MButton onClick={() => fileInputReference.current?.click()}>
          Invite users
          <input ref={fileInputReference} hidden type={'file'} onChange={inviteUsers} />
        </MButton>
      </DialogActions>
    </Dialog>
  )
}
