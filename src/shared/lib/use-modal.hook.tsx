import { useContext } from 'react'

import { ModalContext } from './modal.provider'

export const useModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    modalState,
    setModalState,
    modalText,
    setModalText,
  } = useContext(ModalContext)

  return {
    isModalOpen,
    setIsModalOpen,
    modalState,
    setModalState,
    modalText,
    setModalText,
  }
}
