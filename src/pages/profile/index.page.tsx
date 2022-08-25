import { Avatar, Button, List, ListItem, Paper } from '@mui/material'
import {
  Header,
  HeadingOne,
  HeadingThree,
  HeadingTwo,
  MainContainer,
  Paragraph,
} from '@shared/ui'

const userDaosList = [
  {
    id: 0,
    name: 'DAO name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mi molestie, hendrerit metus sit amet, tincidunt neque. Nulla maximus ex et consectetur scelerisque. Vestibulum eget iaculis nisl.',
  },
  {
    id: 1,
    name: 'DAO name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mi molestie, hendrerit metus sit amet, tincidunt neque. Nulla maximus ex et consectetur scelerisque. Vestibulum eget iaculis nisl.',
  },
  {
    id: 2,
    name: 'DAO name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mi molestie, hendrerit metus sit amet, tincidunt neque. Nulla maximus ex et consectetur scelerisque. Vestibulum eget iaculis nisl.',
  },
  {
    id: 3,
    name: 'DAO name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mi molestie, hendrerit metus sit amet, tincidunt neque. Nulla maximus ex et consectetur scelerisque. Vestibulum eget iaculis nisl.',
  },
]

export default function UserPage() {
  return (
    <>
      <Header />

      <MainContainer>
        <div className="mb-10">
          <HeadingOne className="mb-3">Your profile</HeadingOne>
          <div className="flex items-center space-x-5">
            <Avatar className="h-10 w-10 bg-purple-500">U</Avatar>
            <Paragraph>Wallet address</Paragraph>
          </div>
        </div>

        <HeadingTwo>Your DAO&apos;s list</HeadingTwo>
        <List>
          {userDaosList.map((dao) => (
            <ListItem key={dao.id}>
              <Paper className="my-5 p-5 flex justify-between items-start">
                <div className="h-[6rem] w-[6rem] bg-gray-400" />

                <div className="max-w-[40%]">
                  <HeadingThree>{dao.name}</HeadingThree>
                  <Paragraph>{dao.desc}</Paragraph>
                </div>

                <div className="max-w-[40%]">
                  <HeadingThree>Token info</HeadingThree>
                  <div className="h-14 w-14 bg-gray-400" />
                </div>

                <Button variant="outlined" size="medium">
                  Mint
                </Button>
              </Paper>
            </ListItem>
          ))}
        </List>
      </MainContainer>
    </>
  )
}
