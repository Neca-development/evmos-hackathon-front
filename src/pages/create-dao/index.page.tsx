import { CreateDao } from '@features/create-dao'
import { Header, HeadingOne, MainContainer } from '@shared/ui'

export default function CreateDaoPage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <MainContainer>
        <HeadingOne className="mb-3">DAO creation</HeadingOne>
        <CreateDao.CreateDaoForm />
      </MainContainer>
    </div>
  )
}
