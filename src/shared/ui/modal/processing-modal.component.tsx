import { Modal } from '@mui/material'

import { MPaper } from '../mpaper.component'

interface IProcessingModalProperties {
  isOpen: boolean
  onClose: () => void
  isProcessing?: boolean
  isSuccess?: boolean
  isError?: boolean
}

export function ProcessingModal(props: IProcessingModalProperties) {
  const {
    isOpen,
    isProcessing = false,
    isError = false,
    isSuccess = false,
    onClose,
  } = props

  return (
    <Modal open={isOpen} onClose={!isProcessing ? onClose : () => null}>
      <MPaper>
        {isProcessing && 'Loading...'}
        {isError && 'Error'}
        {isSuccess && 'Success'}
      </MPaper>
    </Modal>
  )
}
