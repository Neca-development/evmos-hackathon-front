import { List, ListItem, Paper } from '@mui/material'
import {
  Header,
  HeadingOne,
  HeadingTwo,
  MainContainer,
  MButton,
  Paragraph,
} from '@shared/ui'

import { VoteCard } from './ui/vote-card.component'

const votesList = [
  {
    id: 0,
    question: 'Voting question',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'active',
  },
  {
    id: 1,
    question: 'Voting question',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'active',
  },
  {
    id: 2,
    question: 'Voting question',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'inactive',
  },
]

export default function DaoPage() {
  return (
    <>
      <Header />

      <MainContainer>
        <Paper className="mb-10 p-9 space-x-14 flex text-white bg-dao-hero">
          {/* DAO image */}
          <div>
            <div className="h-[7rem] w-[7rem] bg-white" />
          </div>
          {/* /DAO image */}

          {/* DAO info */}
          <div>
            <HeadingOne className="mb-1">DAO Name</HeadingOne>

            <Paragraph className="mb-10 space-x-1 flex">
              <img src="/assets/images/web.svg" alt="" />
              <span className="text-orange">SC address</span>
            </Paragraph>

            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Paragraph>
          </div>
          {/* /DAO info */}
        </Paper>

        <div className="mb-5 flex justify-between items-center">
          <HeadingTwo>Current votes</HeadingTwo>
          <MButton>Create vote</MButton>
        </div>

        <List className="space-y-5">
          {votesList.map((vote) => (
            <ListItem key={vote.id} className="p-0">
              <VoteCard vote={vote} />
            </ListItem>
          ))}
        </List>
      </MainContainer>
    </>
  )
}
