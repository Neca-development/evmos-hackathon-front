import type { IMintRequestEntity } from '@entities/mint-request/mint-request.entity'
import { List, ListItem } from '@mui/material'

import { MintRequestCard } from './mint-request-card.component'

interface IMintRequestListProperties {
  mintRequests: IMintRequestEntity[]
}

export function MintRequestList({ mintRequests }: IMintRequestListProperties) {
  return (
    <List className="space-y-5">
      {mintRequests.map((mintRequest) => (
        <ListItem key={mintRequest.id} className="p-0">
          <MintRequestCard mintRequest={mintRequest} />
        </ListItem>
      ))}
    </List>
  )
}
