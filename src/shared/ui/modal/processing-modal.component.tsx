import { CircularProgress, Modal } from '@mui/material'
import { useModal } from '@shared/lib'
import * as React from 'react'

import { CheckIcon } from '../icons'
import { MPaper } from '../mpaper.component'

interface IProcessingModalProperties {
  onClose: () => void
}

export function ProcessingModal({ onClose }: IProcessingModalProperties) {
  const { isModalOpen, modalState, modalText } = useModal()

  return (
    <Modal
      className="flex justify-center items-center"
      open={isModalOpen}
      onClose={modalState !== 'pending' ? onClose : () => null}
    >
      <MPaper className="w-96 px-14 space-x-5 grid grid-cols-12 bg-grayish-blue">
        <div className="flex items-center">
          {modalState === 'pending' && (
            <CircularProgress disableShrink className="text-white" />
          )}

          {modalState === 'success' && (
            <div className="aspect-square w-10 rounded-full bg-green-500">
              <CheckIcon />
            </div>
          )}

          {modalState === 'error' && 'Error'}
        </div>

        <div className="col-span-11 flex items-center text-sm">{modalText}</div>
      </MPaper>
    </Modal>
  )
}
