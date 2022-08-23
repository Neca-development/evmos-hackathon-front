import { useState } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  return {
    isOpen,
    toggle,
  }
}
