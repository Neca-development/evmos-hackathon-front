import type { IModalState } from '@shared/lib/types'
import * as React from 'react'

interface IModalContext {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>

  modalState: IModalState
  setModalState: React.Dispatch<React.SetStateAction<IModalState>>

  modalText: string
  setModalText: React.Dispatch<React.SetStateAction<string>>
}

const INITIAL_STATE: IModalContext = {
  isModalOpen: false,
  setIsModalOpen: (previous) => previous,

  modalState: 'none',
  setModalState: (previous) => previous,

  modalText: '',
  setModalText: (previous) => previous,
}

export const ModalContext = React.createContext<IModalContext>(INITIAL_STATE)

interface IModalProviderProperties {
  children?: React.ReactNode
}

export const ModalProvider = ({ children }: IModalProviderProperties) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalState, setModalState] = React.useState<IModalState>('none')
  const [modalText, setModalText] = React.useState('')

  const providerValues = {
    isModalOpen,
    setIsModalOpen,

    modalState,
    setModalState,

    modalText,
    setModalText,
  }

  return <ModalContext.Provider value={providerValues}>{children}</ModalContext.Provider>
}
