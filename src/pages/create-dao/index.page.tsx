import { CreateDaoUiService } from '@features/create-dao'
import { Header, HeadingOne } from '@shared/ui'

export default function CreateDaoPage() {
  return (
    <>
      <Header />

      <main className="xl:max-w-3xl xl:mx-auto py-5 xl:px-0 px-14">
        <HeadingOne className="mb-7">DAO creation</HeadingOne>
        <CreateDaoUiService.CreateDaoForm />
      </main>
    </>
  )
}
