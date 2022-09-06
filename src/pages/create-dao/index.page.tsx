import { CreateDaoUiService } from '@features/create-dao'
import { Header, HeadingOne } from '@shared/ui'

export default function CreateDaoPage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="max-w-[1536px] mx-auto py-5">
        <HeadingOne className="mb-7">DAO creation</HeadingOne>
        <CreateDaoUiService.CreateDaoForm />
      </main>
    </div>
  )
}
