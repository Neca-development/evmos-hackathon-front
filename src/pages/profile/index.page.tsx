import { Avatar, Box, Button, List, ListItem } from '@mui/material'
import {
  Footer,
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
      <Header>Header</Header>

      <MainContainer>
        <Box className="mb-10">
          <HeadingOne className="mb-3">Your profile</HeadingOne>
          <Box className="flex items-center space-x-5">
            <Avatar className="h-10 w-10 bg-purple-500">U</Avatar>
            <Paragraph>Wallet address</Paragraph>
          </Box>
        </Box>

        <HeadingTwo>Your DAO&apos;s list</HeadingTwo>
        <List>
          {userDaosList.map((dao) => (
            <ListItem key={dao.id} className="my-5 flex justify-between items-start">
              <Box className="h-[6rem] w-[6rem] bg-gray-400" />

              <Box className="max-w-[40%]">
                <HeadingThree>{dao.name}</HeadingThree>
                <Paragraph>{dao.desc}</Paragraph>
              </Box>

              <Box className="max-w-[40%]">
                <HeadingThree>Token info</HeadingThree>
                <Box className="h-14 w-14 bg-gray-400" />
              </Box>

              <Button variant="outlined" size="medium">
                Mint
              </Button>
            </ListItem>
          ))}
        </List>
      </MainContainer>

      <Footer>Footer</Footer>
    </>
  )
}
