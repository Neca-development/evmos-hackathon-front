import { CircularProgress, Modal } from '@mui/material'
import * as React from 'react'

import { CheckIcon } from '../icons'
import { MPaper } from '../mpaper.component'

interface IProcessingModalProperties {
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
  isProcessing?: boolean
  isSuccess?: boolean
  isError?: boolean
}

export function ProcessingModal(props: IProcessingModalProperties) {
  const {
    children,
    isOpen,
    onClose,
    isProcessing = false,
    isError = false,
    isSuccess = false,
  } = props

  return (
    <Modal
      className="flex justify-center items-center"
      open={isOpen}
      onClose={!isProcessing ? onClose : () => null}
    >
      <MPaper className="w-96 px-14 space-x-5 grid grid-cols-12 bg-grayish-blue">
        <div className="flex items-center">
          {isProcessing && <CircularProgress disableShrink className="text-white" />}

          {isSuccess && (
            <div className="aspect-square w-10 rounded-full bg-green-500">
              <CheckIcon />
            </div>
          )}

          {isError && 'Error'}
        </div>
        <div className="col-span-11 flex items-center text-sm">{children}</div>
      </MPaper>
    </Modal>
  )
}
