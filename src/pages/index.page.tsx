import { Header, HeadingOne, MainContainer } from '@shared/ui'

export default function HomePage() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header />

        <MainContainer className="flex-grow flex justify-center items-center">
          <HeadingOne>Evmos Hackathon</HeadingOne>
        </MainContainer>
      </div>
    </>
  )
}
