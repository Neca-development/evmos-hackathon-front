import styles from '@components/shared/modal/modal.module.scss'
import type { ReactNode } from 'react'
import React from 'react'
import { createPortal } from 'react-dom'

export interface IModalProperties {
  className?: string
  children: ReactNode
  isOpen: boolean
  toggle: Function
}

const Modal = (props: IModalProperties) => {
  const { isOpen, toggle, className, children } = props

  return isOpen
    ? createPortal(
        <div className={styles.modal} onClick={() => toggle()}>
          <div
            className={`${styles.modalContent} ${className || ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <>{children}</>
          </div>
        </div>,
        // @ts-expect-error
        document.querySelector('#portal')
      )
    : null
}

const Header: React.FC<any> = ({ children, style, ...rest }) => {
  return <div>{children}</div>
}

const Body: React.FC<any> = ({ children, style, ...rest }) => {
  return <div>{children}</div>
}

const Footer: React.FC<any> = ({ children, style, ...rest }) => {
  return <div>{children}</div>
}

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal
