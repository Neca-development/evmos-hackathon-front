import { Meta } from '@components/meta/meta.component'
import Modal from '@components/shared/modal/modal.component'
import useModal from '@hooks/use-modal.hook'
import { useGetPhotosQuery } from '@store/photos/photos.api'
import { getErrorData } from '@store/utils/get-error-data'
import { isFetchBaseQueryError } from '@store/utils/is-base-query-error'
import { Main } from 'src/layouts/main.layout'

import styles from './index.module.scss'

const Index = () => {
  const { error, isFetching, isLoading, data: photos } = useGetPhotosQuery()
  const { isOpen, toggle } = useModal()

  return (
    <Main meta={<Meta title="NextJS template" description="NextJS template" />}>
      <div className={styles.container}>
        {isFetching || isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {isFetchBaseQueryError(error) && (
              <p>{`${error.status} ${getErrorData(error)}`}</p>
            )}
            <button className={styles.homeButton} onClick={() => toggle()}>
              Open Modal
            </button>
          </>
        )}

        <Modal isOpen={isOpen} toggle={toggle}>
          <Modal.Body>{JSON.stringify(photos, null, 2)}</Modal.Body>
        </Modal>
      </div>
    </Main>
  )
}

export default Index
