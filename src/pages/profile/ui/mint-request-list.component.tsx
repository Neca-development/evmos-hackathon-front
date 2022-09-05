import type { MintRequestModelService } from '@entities/mint-request'
import { MintUiService } from '@features/mint'
import { List, ListItem } from '@mui/material'

interface IMintRequestListProperties {
  mintRequests: MintRequestModelService.IMintRequestEntity[]
  onMint: () => void
}

export function MintRequestList(props: IMintRequestListProperties) {
  const { mintRequests, onMint } = props

  return (
    <List className="space-y-5">
      {mintRequests.map((mintRequest) => (
        <ListItem key={mintRequest.id} className="p-0">
          <MintUiService.MintCard mintRequest={mintRequest} onMint={onMint} />
        </ListItem>
      ))}
    </List>
  )
}
