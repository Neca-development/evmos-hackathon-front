import { Meta } from '@components/meta/meta.component'
import { useGetPhotoQuery } from '@store/photos/photos.api'
import { useRouter } from 'next/router'
import { Main } from 'src/layouts/main.layout'

export interface IPhotoPageProperties {}

export default function PhotoPage(props: IPhotoPageProperties) {
  const router = useRouter()
  const { id } = router.query
  const { data: photo } = useGetPhotoQuery({ id: id as string })
  return (
    <Main meta={<Meta description="photo page" title="photo page" />}>
      {photo && JSON.stringify(photo)}
    </Main>
  )
}
