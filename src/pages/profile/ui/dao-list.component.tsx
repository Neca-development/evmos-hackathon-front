import type { IDaoEntity } from '@entities/dao'
import { List, ListItem } from '@mui/material'

import { DaoCard } from './dao-card.component'

interface IDaoListProperties {
  daos: IDaoEntity[]
}

export function DaoList({ daos }: IDaoListProperties) {
  return (
    <List className="space-y-5">
      {daos.map((dao) => (
        <ListItem key={dao.id} className="p-0">
          <DaoCard dao={dao} />
        </ListItem>
      ))}
    </List>
  )
}
