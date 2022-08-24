import { Box } from '@mui/material'
import { Footer, Header, HeadingOne, MainContainer } from '@shared/ui'

export default function HomePage() {
  return (
    <>
      <Box className="h-screen flex flex-col">
        <Header />

        <MainContainer className="flex-grow flex justify-center items-center">
          <HeadingOne>Evmos Hackathon</HeadingOne>
        </MainContainer>

        <Footer />
      </Box>
    </>
  )
}
