import { List, ListItem } from '@mui/material'
import { Header, HeadingTwo, MainContainer, MButton } from '@shared/ui'
import { useRouter } from 'next/router'
import * as React from 'react'

import { DaoCard } from './ui/dao-card.component'
import { ProfileHero } from './ui/profile-hero.component'

const userDaosList = [
  {
    id: 0,
    name: 'DAO name',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mi molestie, hendrerit metus sit amet, tincidunt neque. Nulla maximus ex et consectetur scelerisque. Vestibulum eget iaculis nisl.',
    status: 'mint',
  },
  {
    id: 1,
    name: 'DAO name',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mi molestie, hendrerit metus sit amet, tincidunt neque. Nulla maximus ex et consectetur scelerisque. Vestibulum eget iaculis nisl.',
    status: 'mint',
  },
  {
    id: 2,
    name: 'DAO name',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mi molestie, hendrerit metus sit amet, tincidunt neque. Nulla maximus ex et consectetur scelerisque. Vestibulum eget iaculis nisl.',
    status: 'enter',
  },
]

export default function UserPage() {
  const router = useRouter()

  React.useEffect(() => {
    router.prefetch('/create-dao')
  }, [])

  const handleCreateButtonClick = () => router.push('/create-dao')

  return (
    <>
      <Header />

      <ProfileHero />

      <MainContainer>
        <div className="mb-5 flex justify-between items-center">
          <HeadingTwo>Your DAO&apos;s list</HeadingTwo>
          <MButton onClick={handleCreateButtonClick}>Create DAO</MButton>
        </div>

        <List className="space-y-5">
          {userDaosList.map((dao) => (
            <ListItem key={dao.id} className="p-0">
              <DaoCard dao={dao} />
            </ListItem>
          ))}
        </List>
      </MainContainer>
    </>
  )
}
