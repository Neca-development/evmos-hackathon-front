import { CreateDao } from '@features/create-dao'
import { Header, HeadingOne, MainContainer } from '@shared/ui'

export default function CreateDaoPage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <MainContainer className="max-w-[1536px]">
        <HeadingOne className="mb-7">DAO creation</HeadingOne>
        <CreateDao.CreateDaoForm />
      </MainContainer>
    </div>
  )
}
