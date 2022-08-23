import Footer from '@components/shared/footer/footer.component'
import Header from '@components/shared/header/header.component'
import type { ReactNode } from 'react'

type IMainProperties = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProperties) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    <Header></Header>
    {props.meta}
    <main className="content py-5 text-xl">{props.children}</main>
    <Footer></Footer>
  </div>
)

export { Main }
