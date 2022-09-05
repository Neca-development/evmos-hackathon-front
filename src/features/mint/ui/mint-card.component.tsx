import { MintRequestUiService } from '@entities/mint-request'

import { useMint } from '../lib'

export function MintCard(props: MintRequestUiService.IMintRequestCardProperties) {
  const { mintRequest, onMint } = props

  const { mint } = useMint()

  const handleMint = async () => {
    await mint(mintRequest)
    onMint()
  }

  return (
    <MintRequestUiService.MintRequestCard mintRequest={mintRequest} onMint={handleMint} />
  )
}
