import { MintRequestApiService } from '@entities/mint-request'

export const useInviteUsers = (daoAddress: string) => {
  const [postMintRequestList] = MintRequestApiService.usePostMintRequestListMutation()

  const inviteUsers = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return

    const csvFile = files[0]
    if (!csvFile) return

    const csvFileFormData = new FormData()
    csvFileFormData.append('file', csvFile)

    await postMintRequestList({ daoAddress, csv: csvFileFormData })
  }

  return { inviteUsers }
}
