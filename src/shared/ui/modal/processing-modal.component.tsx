import { CircularProgress, Dialog } from '@mui/material'
import { useModal } from '@shared/lib'

import { MPaper } from '../containers'
import { CheckIcon, ErrorIcon } from '../icons'

export function ProcessingModal() {
  const { isModalOpen, setIsModalOpen, modalState, modalText } = useModal()

  const handleClose = () => setIsModalOpen(false)

  return (
    <Dialog
      maxWidth={false}
      PaperComponent={MPaper}
      PaperProps={{
        className: 'w-[29rem] px-14 space-x-5 grid grid-cols-12 bg-grayish-blue',
      }}
      className="flex justify-center items-center"
      open={isModalOpen}
      onClose={modalState !== 'pending' ? handleClose : () => null}
    >
      <div className="flex items-center">
        {modalState === 'pending' && (
          <CircularProgress disableShrink className="text-white" />
        )}

        {modalState === 'success' && (
          <div className="aspect-square w-10 rounded-full bg-green-500">
            <CheckIcon />
          </div>
        )}

        {modalState === 'error' && (
          <div className="aspect-square w-10 rounded-full bg-red-500">
            <ErrorIcon />
          </div>
        )}
      </div>

      <div className="col-span-11 flex items-center text-sm">{modalText}</div>
    </Dialog>
  )
}
