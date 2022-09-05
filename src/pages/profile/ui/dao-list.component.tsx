import type { DaoModelService } from '@entities/dao'
import { DaoUiService } from '@entities/dao'
import { List, ListItem } from '@mui/material'

interface IDaoListProperties {
  daos: DaoModelService.IDaoEntity[]
}

export function DaoList({ daos }: IDaoListProperties) {
  return (
    <List className="space-y-5">
      {daos.map((dao) => (
        <ListItem key={dao.id} className="p-0">
          <DaoUiService.DaoCard dao={dao} />
        </ListItem>
      ))}
    </List>
  )
}
