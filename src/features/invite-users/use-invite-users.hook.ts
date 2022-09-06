import { MintRequestApiService } from '@entities/mint-request'
import { useModal } from '@shared/lib'

export const useInviteUsers = (daoAddress: string) => {
  const { setIsModalOpen, setModalState, setModalText } = useModal()

  const [postMintRequestList] = MintRequestApiService.usePostMintRequestListMutation()

  const inviteUsers = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return

    const csvFile = files[0]
    if (!csvFile) return

    const csvFileFormData = new FormData()
    csvFileFormData.append('file', csvFile)

    setIsModalOpen(true)
    setModalState('pending')
    setModalText('Sending invites...')

    await postMintRequestList({ daoAddress, csv: csvFileFormData })

    setModalState('success')
    setModalText('You successfully invites users in this DAO')
  }

  return { inviteUsers }
}
